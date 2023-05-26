
import React from 'react';
import Home from './components/sidebar/sidebar.jsx';
import { Routes, Route } from "react-router-dom";
import Historial from './components/historial/historial.jsx';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>>
    </div>
  );
}

export default App;
