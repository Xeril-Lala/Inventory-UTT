import React, { useState } from 'react';
import Sidebar from './components/sidebar/sidebar.jsx';
import Historical from './components/historical/historical.jsx';
import ActiveLoans from './components/loans/activeLoans.jsx';
import Form from './components/form/form.jsx';
import Login from './components/login/login.jsx'
import Inventory from './components/inventory/inventoryStatus.jsx';
import Equipment from './components/equipment/equipment.jsx';
import UserSingUp from './components/user/userSingUp.jsx';
import './App.css';
import { BrowserRouter, Outlet, Route, Routes, Switch } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider.js';
import ProtectedRoute from './components/protected-route/ProtectedRoute.jsx';

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route 
            element={<SidebarLayout/>}
          >
            <Route 
              index
              element={<Inventory/>}
            />
            <Route 
              path="/inventory" 
              element={
                <Inventory/>
              }
            />
            <Route 
              path="/activeloans" 
              element={
                <ActiveLoans />
              } 
            />
            <Route 
              path="/historical" 
              element={
                <Historical />
              } 
            />
            <Route 
              path="/form" 
              element={
                <Form />
              } 
            />
            <Route 
              path="/equipment" 
              element={
                <Equipment />
              } 
            />
            <Route 
              path="/userSingUp" 
              element={
                <UserSingUp />
              } 
            />
            <Route path="*" element={<> <h1>Not Founded</h1> </>} />
          </Route>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

const SidebarLayout = () => (
  <>
    <Sidebar> 
      <Outlet/>
    </Sidebar>
  </>
);

export default App;