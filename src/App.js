import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Use HashRouter
import Dashboard from './Page/DashBoard';
import Login from './Page/Login';
import Register from './Page/Reg';

const App = () => {
  return (
    <Router>
      {/* The side menu stays the same for all pages */}
      {/* Main content area */}
     
        <Routes>
          {/* Define routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/services" element={<h1>Services Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
        </Routes>
      
    </Router>
  );
};

export default App;
