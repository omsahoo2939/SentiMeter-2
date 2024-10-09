import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FeedbackForm from './components/FeedbackForm';
import Employees from './components/Employees';

import Loading from './components/Loading';
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/form" element={<FeedbackForm />} />
          <Route path="/employees" element={<Employees />} />
          {/* <Route path="/characters/:id" element={<Character />} /> */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;
