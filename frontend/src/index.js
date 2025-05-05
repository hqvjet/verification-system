import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import { Start } from './screens/Start/Start';
import { Home } from './screens/Home/Home';
import reportWebVitals from './reportWebVitals';
import { Information } from "./screens/Infomation/Infomation"; // Import Information
import { AddProduct } from "./screens/AddProduct/addproduct"; // Import AddProduct


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} /> {/* Trang Home */}
        <Route path="/information" element={<Information />} /> {/* Trang Information */}
        <Route path="/" element={<Start />} /> {/* Trang Start */}
        <Route path="/addproduct" element={<AddProduct />} /> {/* Route AddProduct */}
      </Routes>
    </Router>
);

reportWebVitals();
