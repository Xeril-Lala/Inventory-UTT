import { useEffect, useState } from "react";
import LoanService from '../../services/Loan';
import Select from 'react-select';
import InventoryService from '../../services/Inventory';
import { C } from '../../constants/C';
import { toast } from 'react-toastify';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getBadgeClass } from "../../constants/utils";
import { FaPlus} from "react-icons/fa";

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

    const [modes, setModes] = useState([]);

    const loanService = new LoanService();
    const inventoryService = new InventoryService();

    const isEditable = () => {
        return loanStatus !== C.status.loan.TERMINADO;
    };

    useEffect(() => {
        const fetchData = async () => {
            let res = await loanService.getLoanModes();
            if (res?.data) {
                let m = res.data.map(x => ({ value: x.code, label: x.code }));
                setModes(m);
            }

            let res2 = await inventoryService.getItems({ isActive: true });
            if (res2?.data) {
                let m = res2.data.map(x => ({ value: x.id, label: `${x.customKey} - ${x.name}`, data: x }));
                setItemList(m);
            }
        }

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
        }
    }, [loan]);


    const getStatus = () => {
        if(!id) {
            return C.status.loan.PRESTADO;
        } else {
            return  C.status.loan.TERMINADO;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let returned = null;

        if(returnedOn || getStatus() == C.status.loan.TERMINADO) {
            returned = returnedOn || new Date(Date.now());
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
            responsibleId: responsableID || null,
            loanStatus: getStatus(),
            items: selectedItems?.map(x => ({
                item: {
                    id: x.data.id || null
                },
                detailStatus: getStatus(),
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
            
            await onTriggerRefresh();
            clearInputs();
        }
    };

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
        loan = null;
    };

    return (
        <>
            <div className="flex justify-end">
                <FaPlus onClick={clearInputs} className="text-2xl cursor-pointer hover:text-green-500" title="Crear Préstamo" />
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
                    <label htmlFor="responsableID" className="block mb-1 font-bold">Responsable ID</label>
                    <input
                        type="text"
                        id="responsableID"
                        className="w-full bg-gray-100 rounded-md p-2"
                        value={responsableID}
                        onChange={(e) => setResponsableID(e.target.value)}
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
                        <span className={getBadgeClass(loanStatus)}> {loanStatus} </span>
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
                        placeholder="Selecciona una opcion"
                        isDisabled={!isEditable()}
                    />
                </div>
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