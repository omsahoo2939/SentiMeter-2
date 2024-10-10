import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import FeedbackForm from './components/FeedbackForm';
import QuestionForm from './components/QuestionForm';
import Employees from './components/Employees';
import Login from './components/Login'; 

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState([]);
    const [userId, setUserId] = useState(-1);
    const [userReportsTo, setUserReportsTo] = useState(-1);
    const [userDirectReports, setUserDirectReports] = useState([]);
// user setuser pass down setuser
    const handleLoginSuccess = (email,id,reportsTo,directReports) => {
      setUserId(id)
      setUserReportsTo(reportsTo)
      setUserDirectReports(directReports)
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
                <Route path="/feedbackForm" element={isLoggedIn ? <FeedbackForm data={userEmail}/> : <Navigate to="/login" />} />
                <Route path="/questionForm" element={isLoggedIn ? <QuestionForm data={userEmail}/> : <Navigate to="/login" />} />
                <Route path="/employees" element={isLoggedIn ? <Employees data={userEmail}/> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
                {/* <Route path="/add" element={<AddSock /> } /> */}
            </Routes>
        </Router>
    );
};

export default App;
