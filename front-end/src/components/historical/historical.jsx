import react from 'react';
import { useEffect, useState } from 'react';
import { FiFilter, FiAlertCircle } from 'react-icons/fi';
import { MdLaptop } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
const Historical = () => {

   const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('URL_DE_LA_API');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
 

return (

   <table>
      <thead>
        <tr>
          <th>Columna 1</th>
          <th>Columna 2</th>
          <th>Columna 3</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>



);
};

export default Historical;