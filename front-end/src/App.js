import React, { useState } from 'react';
import Sidebar from './components/sidebar/sidebar.jsx';
import Historical from './components/historical/historical.jsx';
import ActiveLoans from './components/loans/activeLoans.jsx';
import Form from './components/form/form.jsx';
import Login from './components/login/login.jsx'
import Asset from './components/asset/assetStatus.jsx';
import Equipment from './components/equipment/equipment.jsx';
import UserSingUp from './components/user/userSingUp.jsx';
import './App.css';
import { BrowserRouter, Outlet, Route, Routes, Switch } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider.js';
import UserTable from './components/user/userShow.jsx';
import LoanForm from './components/loans/loanForm.jsx';
import ProtectedRoute from './components/protected-route/ProtectedRoute.jsx';
import { ToastContainer, toast } from 'react-toastify';
import HttpBase from './services/HttpBase.js';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);


  HttpBase.onError = (error) => toast.error(error, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route 
              element={<SidebarLayout/>}
            >
              <Route 
                index
                element={<Asset/>}
              />
              <Route 
                path="/assets" 
                element={
                  <Asset/>
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
    </>
  );
};

const SidebarLayout = () => (
  <>
    <Sidebar>
      <ProtectedRoute>
        <Outlet/>
      </ProtectedRoute>
    </Sidebar>
  </>
);

export default App;