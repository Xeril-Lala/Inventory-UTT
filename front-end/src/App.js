
import React from 'react';
import Sidebar from './components/sidebar/sidebar.jsx';
import { Routes, Route } from "react-router-dom";
import Historical from './components/historical/historical.jsx';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Sidebar />} />
        </Routes>
    </div>
  );
}

export default App;
