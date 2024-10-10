import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import FeedbackForm from './components/FeedbackForm';
import QuestionForm from './components/QuestionForm';
import Employees from './components/Employees';
import Login from './components/Login'; 

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
// user setuser pass down setuser
    const handleLoginSuccess = (email) => {
      setUserEmail(email)
      setIsLoggedIn(true);
    };
    // const handleLoginSuccess = () => {
    //     setIsLoggedIn(true);
    // };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                {userEmail}
                <Route path="/home" element={isLoggedIn ? <Home data={userEmail}/> : <Navigate to="/login" />} />
                <Route path="/feedbackForm" element={isLoggedIn ? <FeedbackForm /> : <Navigate to="/login" />} />
                <Route path="/questionForm" element={isLoggedIn ? <QuestionForm /> : <Navigate to="/login" />} />
                <Route path="/employees" element={isLoggedIn ? <Employees /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
                {/* <Route path="/add" element={<AddSock /> } /> */}
            </Routes>
        </Router>
    );
};

export default App;
