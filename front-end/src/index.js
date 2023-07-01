import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import dotenv from 'dotenv';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App/>);
dotenv.configDotenv();

reportWebVitals();