import React, { useState, useEffect } from 'react';
import LoanService from '../../services/Loan';
import Select from 'react-select';
import InventoryService from '../../services/Inventory';
import { C } from '../../constants/C';
import { Medapps } from 'styled-icons/fa-brands';
import { toast } from 'react-toastify';
import LoanForm from './loanForm';
import LoanList from './loanList';
import ReactDatePicker from 'react-datepicker';
import { getFirstAndLastDayOfWeek } from '../../constants/utils';

const statusList = [
    {value: C.status.loan.PRESTADO, label: C.status.loan.PRESTADO},
    {value: C.status.loan.TERMINADO, label: C.status.loan.TERMINADO},
    {value: C.status.loan.PERDIDO, label: C.status.loan.PERDIDO},
    {value: C.status.loan.VENCIDO, label: C.status.loan.VENCIDO}
];

const MyForm = () => {
    const [inventoryId, setInventory] = useState(null);

    const [selectedLoan, setLoan] = useState(null);
    const [loans, setLoans] = useState([]);

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const [selectedStatus, setStatus] = useState(null);
    const [selectedMode, setMode] = useState(null);

    const [modes, setModes] = useState([]);

    const [trigger, setTrigger] = useState(false);

    const loanService = new LoanService();

    useEffect(() => {
        const loadModes = async () => {
            const {firstDay, lastDay } = getFirstAndLastDayOfWeek();

            setFrom(firstDay);
            setTo(lastDay);

            let res = await loanService.getLoanModes();
            if (res?.data) {
                let m = res.data.map(x => ({ value: x.code, label: x.code }));
                setModes(m);
            }
        }

        loadModes();
    }, [])

    useEffect(() => {
        fetchData();

    }, [from, to, selectedStatus, selectedMode, inventoryId]);
    
    const fetchData = async () => {
        let res = await loanService.getLoans({ 
            isActive: true, 
            fromDt: from || null, 
            toDt: to || null, 
            mode: selectedMode?.value || null
        });
        
        if(res?.status == C.status.common.ok) {
            res.data = res.data.filter(x => ( 
                (   !selectedStatus || x?.loanStatus == selectedStatus.value )
                    && (!inventoryId || x?.items?.some( i => {
                        let item = i.item;
                        return item.customKey.includes(inventoryId) || item.name.includes(inventoryId);
                    })
                )
            ));
            setLoans(res.data);
        }
    }

    const selectLoan = (loan) => {
        setLoan(null);
        setLoan(loan);
    }

    return (
        <>
            <div className="grid grid-cols-8 gap-4 rounded-md shadow-md bg-white p-2 my-2">
                <input
                    type="text"
                    className="w-full col-span-2 border rounded-md p-2"
                    value={inventoryId}
                    onChange={(e) => setInventory(e.target.value)}
                    placeholder="Buscar Inventario..."
                    autoComplete='off'
                />
                <Select
                    options={modes}
                    onChange={setMode}
                    value={selectedMode}
                    className="col-span-1" 
                    isClearable
                    isSearchable
                    placeholder="Tipo de Préstamo"
                />

                <Select
                    options={statusList}
                    onChange={setStatus}
                    value={selectedStatus}
                    className="col-span-1" 
                    isClearable
                    isSearchable
                    placeholder="Estado Préstamo"
                />

                <div className="col-span-2 flex align-middle">
                    <label className="mt-2 mr-1"> Prestado en... </label>
                    <ReactDatePicker
                        startDate={from}
                        selected={from}
                        onChange={setFrom}
                        className="border rounded-md p-2"
                        showTimeInput
                        showIcon
                        dateFormat="dd/MM/yyyy HH:mm:ss"
                        placeholder="Prestado en..."
                    />
                </div>

                <div className="col-span-2 flex align-middle">
                    <label className="mt-2 mr-1"> Prestado hasta... </label>

                    <ReactDatePicker
                        startDate={to}
                        selected={to}
                        onChange={setTo}
                        className="border rounded-md p-2"
                        showTimeInput
                        showIcon
                        dateFormat="dd/MM/yyyy HH:mm:ss"
                        placeholder="Prestado hasta..."
                    />
                </div>
                
            </div>

            <div className="grid grid-cols-6 gap-4 md:auto-cols-min">

                <div className="col-span-4 rounded-md shadow-md bg-white p-6">
                    <h2 className="text-2xl mb-4">Lista de Préstamos</h2>
                    <LoanList data={loans} onItemClick={selectLoan} />
                </div>

                <div className="col-span-2 rounded-md shadow-md bg-white p-6">
                    <h2 className="text-2xl mb-4">Editar/Crear Préstamo</h2>
                    <LoanForm loan={selectedLoan} onTriggerRefresh={fetchData}/>
                </div>

            </div>
        </>
    );
};

export default MyForm;