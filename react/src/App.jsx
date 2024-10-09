import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import FeedbackForm from './components/FeedbackForm';
import Employees from './components/Employees';
import AddSock from './components/AddSock'
import Login from './components/Login'; 

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                <Route path="/feedbackForm" element={isLoggedIn ? <FeedbackForm /> : <Navigate to="/login" />} />
                <Route path="/employees" element={isLoggedIn ? <Employees /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/add" element={<AddSock /> } />
            </Routes>
        </Router>
    );
};

export default App;
