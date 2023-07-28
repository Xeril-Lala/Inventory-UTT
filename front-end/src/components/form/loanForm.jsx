import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import TextInput from 'react-autocomplete-input';
import "react-datepicker/dist/react-datepicker.css";
import { FaExclamation, FaPlus } from "react-icons/fa";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { C } from '../../constants/C';
import { getBadgeClass } from "../../constants/utils";
import InventoryService from '../../services/Inventory';
import LoanService from '../../services/Loan';
import UserService from "../../services/User";
import AssetService from "../../services/Asset";

const LoanForm = ({loan, onTriggerRefresh}) => {
    const [id, setId] = useState('');

    const [loanedOn, setLoanedOn] = useState('');
    const [returnedOn, setReturnedOn] = useState('');

    const [responsable, setResponsable] = useState('');
    const [responsableID, setResponsableID] = useState('');
    const [responsableContact, setResponsableContact] = useState('');
    const [loanMode, setLoanMode] = useState('');
    const [comments, setComments] = useState('');

    const [loanStatus, setStatus] = useState('');

    const [selectedItems, setSelectedItems] = useState([]);
    const [itemList, setItemList] = useState([]);

    const [location, setLocation] = useState(null);

    const [modes, setModes] = useState([]);
    const [autoOptions, setAutoOptions] = useState([]);
    const [locationList, setLocationList] = useState([]);

    const loanService = new LoanService();
    const inventoryService = new InventoryService();
    const userService = new UserService();
    const assetService = new AssetService();

    const isEditable = () => {
        return loanStatus !== C.status.loan.TERMINADO;
    };

    const fetchData = async () => {
        let res = await loanService.getLoanModes();
        if (res?.data) {
            let m = res.data.map(x => ({ value: x.code, label: x.code }));
            setModes(m);
        }

        let res2 = await inventoryService.getItems({ isActive: true, isUsed: false });
        if (res2?.data) {
            let m = res2.data.map(x => ({ value: x.id, label: `${x.customKey} - ${x.name}`, data: x }));
            setItemList(m);
        }

        // 
        let res3 = await userService.getUsers({})
        if(res3?.data) {
            setAutoOptions(res3?.data.map(x => `${x?.username};${x?.contact?.id}`));
        }

        let res4 = await assetService.getAssets({ group: "LOCATION", isActive: true });
        if(res4?.data) {
            setLocationList(res4?.data.map(x => ({ value: x.code, label: x.value, data: x })));
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(loan) {
            let contact = loan?.contact?.length > 0? 
                loan?.contact[0] : ''
            ;

            let selectedItems = loan?.items?.length > 0? 
                loan.items.map(x => ({ value: x.item.customKey, label: `${x.item.customKey} - ${x.item.name}`, data: x.item }))
                : []
            ;

            setId(loan?.id || '');
            setLoanedOn(loan?.loanedOn? new Date(loan?.loanedOn) : '');
            setReturnedOn(loan?.returnedOn? new Date(loan?.returnedOn) : '');
            setResponsable(loan?.responsible || '');
            setResponsableID(loan?.responsibleId || '');
            setResponsableContact(contact || '');
            setSelectedItems(selectedItems || []);
            setLoanMode( { value: loan?.mode?.code, label: loan?.mode?.code, data: loan?.mode } || '');
            setStatus(loan?.loanStatus || '');
            setComments(loan?.comments || '');

            if(loan?.mode?.code == C.tipo.MOBILIARIO || loan?.mode?.code == C.tipo.RESGUARDO) {
                var items = loan?.items;

                if(items?.length > 0) {
                    setLocation(({ value: items[0]?.item.location?.code, label: items[0]?.item.location?.value, data: items[0]?.item }));
                }
            }
        }
    }, [loan]);


    const getStatus = () => {
        if(!id) {
            return C.status.loan.PRESTADO;
        } else {
            return  C.status.loan.TERMINADO;
        }
    }

    const isLoanedXExists = () => {
        return loanStatus == C.status.loan.PRESTADO && id;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setLoan();
    };

    const setLoan = async (customStatus = null) => {
        let returned = null;
        let respId = null;

        if(returnedOn || (customStatus ?? getStatus()) == C.status.loan.TERMINADO) {
            returned = returnedOn || new Date(Date.now());
        }

        if(responsableID) {
            respId = responsableID.trim().replace("@", "");
            
            let split = respId.split(";");

            if(split.length > 0) {
                respId = split[1] ?? split[0];
            }
        }

        let res = await loanService.setLoan({
            id: id || null,
            comments: comments || null,
            loanedOn: loanedOn || null,
            returnedOn: returned || null,
            mode: {
                code: loanMode?.value || null
            },
            contact: [responsableContact],
            responsible: responsable || null,
            responsibleId: respId || null,
            loanStatus: customStatus ?? getStatus(),
            items: selectedItems?.map(x => ({
                item: {
                    id: x.data.id || null
                },
                detailStatus: customStatus ?? getStatus(),
                description: comments || null
            })),
            isActive: true,
        });

        if (res?.status == C.status.common.ok) {
            toast.success('Préstamo creado/actualizado', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            if(loanMode?.value == C.tipo.MOBILIARIO || loanMode?.value == C.tipo.RESGUARDO) {
                selectedItems?.forEach(async x => {
                    let item = x.data;
                    item.location.code = location.value || null;
                    inventoryService.setItem(item);
                });
            }
            
            await onTriggerRefresh();
            await fetchData();
            clearInputs();
        }
    }

    const setAutoCompleteID = async (value) => {
        value = value.replace("@", "");
        let split = value.split(";");

        if(split.length > 0) {
            value = split[0]
            let res = await userService.getUser(value);

            if(res?.status == C.status.common.ok && res?.data?.username) {
                // setResponsableID(res?.data?.contact?.id);
                setResponsable(`${res?.data?.name} ${res?.data?.lastname}`);
                setResponsableContact(res?.data?.contact?.email || '');
            }
        }
    }

    const clearInputs = () => {
        setId('');
        setLoanedOn('');
        setReturnedOn('');
        setResponsable('');
        setResponsableID('');
        setResponsableContact('');
        setSelectedItems([]);
        setLoanMode('');
        setStatus('');
        setComments('');
    };

    return (
        <>
            <div className="flex justify-end">
                <FaPlus onClick={clearInputs} className="text-2xl cursor-pointer hover:text-green-500" title="Crear Préstamo" />
                { isLoanedXExists()  && <FaExclamation onClick={ async () => setLoan(C.status.loan.PERDIDO)} className="text-2xl cursor-pointer hover:text-orange-500" title="Declarar Perdido" />}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 grid grid-cols-2">
                    <div>
                        <label className="block mb-1 font-bold">Prestado desde:</label>
                        <ReactDatePicker
                            startDate={loanedOn}
                            selected={loanedOn}
                            onChange={setLoanedOn}
                            className="w-full bg-gray-100 rounded-md p-2"
                            showTimeInput
                            showIcon
                            disabled={true}
                            dateFormat="dd/MM/yyyy HH:mm:ss"
                            placeholder="Prestado en..."
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-bold">Regresado en:</label>
                        <ReactDatePicker
                            startDate={returnedOn}
                            selected={returnedOn}
                            onChange={setReturnedOn}
                            start
                            className="w-full bg-gray-100 rounded-md p-2"
                            showTimeInput
                            showIcon
                            dateFormat="dd/MM/yyyy HH:mm:ss"
                            placeholder="Devuelto en..."
                            disabled={ !id || !isEditable()}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="responsableID" className="block mb-1 font-bold">Responsable ID</label>
                    <TextInput 
                        id="responsableID"
                        Component="input"
                        maxOptions={10}
                        className="w-full bg-gray-100 rounded-md p-2"
                        onSelect={setAutoCompleteID}
                        onChange={setResponsableID}
                        value={responsableID}
                        disabled={!isEditable()}
                        options={autoOptions} 
                        matchAny={true}
                        autoComplete='off'
                        spacer={""}
                        spaceRemovers={[" ", "\n"]}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="responsable" className="block mb-1 font-bold">Responsable</label>
                    <input
                        type="text"
                        id="responsable"
                        className="w-full bg-gray-100 rounded-md p-2"
                        value={responsable}
                        onChange={(e) => setResponsable(e.target.value)}
                        disabled={!isEditable()}
                        autoComplete='off'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="responsableContact" className="block mb-1 font-bold">Responsable Contacto</label>
                    <input
                        type="text"
                        id="responsableContact"
                        className="w-full bg-gray-100 rounded-md p-2"
                        value={responsableContact}
                        onChange={(e) => setResponsableContact(e.target.value)}
                        disabled={!isEditable()}
                        autoComplete='off'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="comments" className="block mb-1 font-bold">
                        Comentarios
                    </label>
                    <textarea
                        id="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        className="w-full bg-gray-100 rounded-md p-2"
                        disabled={!isEditable()}
                    />
                </div>
                { loanStatus && <div className="mb-4 text-center">
                    <label className="block mb-1 font-bold">
                        <span className={getBadgeClass(loanStatus)}> <b> {loanStatus} </b> </span>
                    </label>
                </div> }
                <div className="mb-4">
                    <label htmlFor="loanType" className="block mb-1 font-bold">Tipo de Préstamo</label>
                    <Select
                        value={loanMode}
                        options={modes}
                        onChange={setLoanMode}
                        isClearable
                        isSearchable
                        placeholder="Selecciona un tipo de préstamo"
                        isDisabled={!isEditable()}
                    />    
                </div>

                { ( loanMode?.value == C.tipo.MOBILIARIO || loanMode?.value == C.tipo.RESGUARDO ) &&  <div className="mb-4">
                    <label htmlFor="loanLocation" className="block mb-1 font-bold">Location</label>
                    <Select
                        value={location}
                        options={locationList}
                        onChange={setLocation}
                        isClearable
                        isSearchable
                        placeholder="Selecciona una locacion"
                        isDisabled={!isEditable()}
                    />
                </div>}

                <div className="mb-4">
                    <label htmlFor="objectItem" className="block mb-1 font-bold">Añadir Inventario</label>
                    <Select
                        value={selectedItems}
                        options={itemList}
                        onChange={setSelectedItems}
                        isMulti
                        isClearable
                        isSearchable
                        placeholder="Selecciona un bien del Inventario"
                        isDisabled={!isEditable()}
                    />
                </div>
                { ( isEditable() ) && <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2 mt-4">
                    Cerrar/Crear Préstamo
                </button> }
            </form> 
        </>
    );
}

export default LoanForm;