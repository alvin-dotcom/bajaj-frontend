import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorListing from './pages/DoctorListing/DoctorListing';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorListing />} />
      </Routes>
    </Router>
  );
}

export default App;