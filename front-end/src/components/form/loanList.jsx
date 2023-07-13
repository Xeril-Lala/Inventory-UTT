import React, { useState } from 'react';
import { formatDate, getBadgeClass } from '../../constants/utils';

const LoanList = ({ data, onItemClick }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const handleItemClick = (item) => {
    onItemClick(item);
  };

  const toggleItem = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems((prevItems) => prevItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems((prevItems) => [...prevItems, itemId]);
    }
  };

  return (
    <div className="overflow-y-auto space-y-4">
      {data?.map((item) => (
        <div key={item.id} className="bg-white border rounded-md px-2">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleItem(item.id)}>

            <div className="w-full grid grid-cols-4 gap-4">
                <h2 className="col-span-3 text-lg text-blue-500 font-medium">
                    <b> Responsable: </b> {item?.responsible} <br/>
                    <b> Historial: </b>  { formatDate(item?.loanedOn) } { item?.returnedOn && ( " hasta " +  formatDate(item?.returnedOn) )}
                </h2>
            </div>

            <svg className={`w-4 h-4 transition-transform ${expandedItems.includes(item.id) ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>

          </div>
          {expandedItems.includes(item.id) && (
            <div className="mb-2 border-t grid grid-cols-4 grid-rows-2 gap-4">

                <div className="m-2 col-span-2 ">
                    <p> <b>ID:</b> { item?.id }</p>
                    <p> <b>Responsable ID:</b> {item?.responsibleId}</p>
                    <p> <b>Responsable:</b> {item?.responsible}</p>
                    {item?.contact && <p> <b>Responsable Contacto:</b> {item?.contact[0]} </p> }
                </div>

                <div className="w-full m-2 col-span-2 ">
                    <p> <b>Estado:</b> <span className={getBadgeClass(item?.loanStatus)} > {item?.loanStatus} </span> </p>
                    <p> <b>Auditor:</b> {item?.auditUser}</p>
                    <p> <b>Prestado:</b> { formatDate(item?.loanedOn) }</p>
                    {item?.returnedOn && <p> <b>Regresado:</b> { formatDate(item?.returnedOn) }</p> }
                    <p> <b>Tipo:</b> {item?.mode?.code} </p>
                </div>
                
                <div className="w-full m-2 col-span-3">
                    <div className="w-full text-center ">
                        <b> Detalles </b>
                    </div>

                    <div className="w-full mx-10">
                        <ul class="list-inside list-disc">
                            {item?.items?.map(x => (
                                <li> <b>{x?.item?.customKey}:</b> {x?.item?.name} </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <button onClick={() => handleItemClick(item)} className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full py-2 px-4 m-auto">
                        Revisar
                    </button>
                </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LoanList;