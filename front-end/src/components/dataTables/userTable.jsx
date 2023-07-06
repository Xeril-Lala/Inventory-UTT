import React from 'react';

    const UserTable = ({ columns, data }) => {
    return (
        <table>
        <thead>
            <tr>
            {columns.map(column => (
                <th key={column.field}>{column.header}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {data.map((row, index) => (
            <tr key={index}>
                {columns.map(column => (
                <td key={column.field}>{row[column.field]}</td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>
    );
    };

export default UserTable;
