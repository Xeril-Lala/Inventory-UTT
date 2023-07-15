// import React, { useEffect, useState } from 'react';
// import { FaUserPlus, FaTrash, FaEdit, FaUserEdit, FaSave } from 'react-icons/fa';
// import { C } from '../../constants/C';
// import { toast } from 'react-toastify';
// import setItemExcel from '../../services/Inventory';

// const InventoryExcel = ({ excel, updateExcelCallback = () => {} }) => {
//     const setItemExcel = new setItemExcel();
    
//     const [isEditable, setEditable] = useState(false);

//     // const updateAsset = async (active = true) => {
//     //     var data = {
//     //         ...assetData,
//     //         isActive: active
//     //     }

//         //const response = await assetService.setAsset(data);

//         if (response?.status == C.status.common.ok) {
//             updateAssetCallback(response.data);
//             toast.success('Equipo Actualizado', {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
//         }

    

//     const handleInputChange = (e) => {
//         const { asset, value } = e.target;
//         setAssetData((prevAssetData) => ({
//             ...prevAssetData,
//             [asset]: value,
//         }));
//     };

//     const toggleEdit = () => setEditable((value) => !value);



//     return (
//         <div>
//             <div className="flex justify-end">
//                 <FaEdit onClick={toggleEdit} className="text-2xl mr-2 cursor-pointer hover:text-blue-500" title="Editar" />
//                 { isEditable && <FaSave onClick={async () => await updateAsset()} className="text-2xl mr-2 cursor-pointer hover:text-green-500" title="Guardar" /> }
//             </div>
//             <div className="grid grid-cols-2 gap-4 p-6 text-base font-mono">
//                 <div className="col-span-2 flex flex-nowrap flex-col">
//                     <p>Archivo .XLS</p>
//                     <input
//                         type="file"
//                         name="code"
//                         placeholder="Codigo de Equipo"
//                         className="bg-gray-100 rounded-md p-2 appearance-textfield"
//                         accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//                         value={assetData.code}
//                         disabled={!isEditable}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
//     };
// export default InventoryExcel;