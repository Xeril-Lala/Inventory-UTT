import React from 'react';
import Sidebar from './components/sidebar/sidebar.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Historical from './components/historical/historical.jsx';
import ActiveLoans from './components/loans/activeLoans.jsx';
import Form from './components/form/form.jsx';
import Login from './components/login/login.jsx'
import Inventory from './components/inventory/inventoryStatus.jsx';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/activeloans" element={<ActiveLoans />} />
          <Route path="/historical" element={<Historical />} />
          <Route path="/form" element={<Form />} />
          
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};


export default App;
