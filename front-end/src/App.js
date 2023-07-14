import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Asset from './components/asset/assetStatus.jsx';
import Form from './components/form/form.jsx';
import Historical from './components/historical/historical.jsx';
import Login from './components/login/login.jsx';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import Sidebar from './components/sidebar/sidebar';
import UserSingUp from './components/user/userSingUp.jsx';
import { AuthProvider } from './providers/AuthProvider.js';
import HttpBase from './services/HttpBase.js';

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