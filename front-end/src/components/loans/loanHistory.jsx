import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { C } from '../../constants/C.js';
import { downloadFile, formatDate } from '../../constants/utils.js';
import AssetService from '../../services/Asset.js';
import UserService from '../../services/User.js';
import CustomTable from '../customTable/customTable.jsx';
import { FaDownload, FaFileExcel } from 'react-icons/fa';
import InputFiles from 'react-input-files';
import { toast } from 'react-toastify';
import ReactDatePicker from 'react-datepicker';
import { getFirstAndLastDayOfWeek } from '../../constants/utils';
import LoanService from '../../services/Loan.js';

const statusList = [
    { value: C.status.loan.PRESTADO, label: C.status.loan.PRESTADO},
    { value: C.status.loan.TERMINADO, label: C.status.loan.TERMINADO},
    { value: C.status.loan.PERDIDO, label: C.status.loan.PERDIDO},
    { value: C.status.loan.VENCIDO, label: C.status.loan.VENCIDO}
];

const LoanHistory = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [trigger, setTrigger] = useState(false);

    const [selectedStatus, setStatus] = useState(null);
    const [selectedMode, setMode] = useState(null);

    const [modes, setModes] = useState([]);

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
        setTrigger(val => !val);
    }, [from, to, selectedStatus, selectedMode]);

    const convertData = (response) => {
        if(response?.status == C.status.common.ok) {
            let res = response?.data;

            return res.map(x => {
                var item = x.item;
                var location = item.location.value;
                var loan = x.loan;
                var mode = loan.mode.code;

                return ({
                    customKey: item?.customKey,
                    serial: item?.serial,
                    name: item?.name,
                    mode: mode,
                    description: x?.description,
                    status: x?.detailStatus,
                    loanedOn: !loan?.loanedOn ? null : formatDate(new Date(loan?.loanedOn)),
                    returnedOn: !loan?.returnedOn ? null : formatDate(new Date(loan?.returnedOn)),
                    audit: x?.auditUser
                });
            });

        } else return [];
    };

    const columns = [
        {
            name: "ID",
            selector: "customKey",
        },
        {
            name: "Serial",
            selector: "serial",
        },
        {
            name: "Nombre",
            selector: "name",
        },
        {
            name: "Tipo Préstamo",
            selector: "mode"
        },
        {
            name: "Comentarios",
            selector: "description"
        },
        {
            name: "Estado",
            selector: "status"
        },
        {
            name: "Prestado",
            selector: "loanedOn",
        },
        {
            name: "Regresado",
            selector: "returnedOn",
        },
        {
            name: "Auditor",
            selector: "audit",
        }
    ];

    return (
        <>
            <div className="grid grid-cols-8 gap-4 rounded-md shadow-md bg-white p-2 my-2">
                <Select
                    options={modes}
                    onChange={setMode}
                    value={selectedMode}
                    className="col-span-2" 
                    isClearable
                    isSearchable
                    placeholder="Tipo de Préstamo"
                />

                <Select
                    options={statusList}
                    onChange={setStatus}
                    value={selectedStatus}
                    className="col-span-2" 
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

            <div className="w-full rounded-md shadow-md bg-white p-6">
                <CustomTable
                    title={"Historial de préstamo"}
                    columns={columns}
                    convertData={convertData}
                    onHook={async () => await loanService.getLoanDetails({
                        isActive: true,
                        fromDt: from || null,
                        toDt: to || null,
                        loanMode: selectedMode?.value || null,
                        loanStatus: selectedStatus?.value || null
                    })}
                    onSelectRow={() => {}}
                    styles={C.styles.dataTable}
                    triggerRefresh={trigger}
                />
            </div>
        </>
    );
};

export default LoanHistory;