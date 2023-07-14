import React, { useState, useEffect } from 'react';
import LoanService from '../../services/Loan';
import Select from 'react-select';
import InventoryService from '../../services/Inventory';
import { C } from '../../constants/C';
import { Medapps } from 'styled-icons/fa-brands';
import { toast } from 'react-toastify';
import LoanForm from './loanForm';
import LoanList from './loanList';

const MyForm = () => {
    const [selectedLoan, setLoan] = useState({});
    const [loans, setLoans] = useState([]);
    const loanService = new LoanService();

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        let res = await loanService.getLoans({ isActive: true });
        
        if(res?.status == C.status.common.ok) {
            setLoans(res.data);
        }
    }

    const selectLoan = (loan) => {
        setLoan(loan);
    }

    return (
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
    );
};

export default MyForm;