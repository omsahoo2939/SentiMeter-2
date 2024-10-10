import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = (props) => {
  return (
    <div className="home-container">
      <nav className="nav-bar">
        {props.reportsTo>0 &&(<Link to="/feedbackForm">
          <button className="nav-button">Give Feedback</button>
        </Link>)}
        {props.reportsTo>0 &&(<Link to="/questionForm">
          <button className="nav-button">Ask Questions</button>
        </Link>)}
        {props.directReports.length>0 &&(<Link to="/checkFeedback">
          <button className="nav-button">Check Feedback</button>
        </Link>)}
      </nav>
      <h1 className="main-title">Welcome to SentiMeter</h1>
      <p className="sub-title">Gain meaningful insights through the power of sentiment analysis</p>
      <div>User: {props.email}</div>
    </div>
  );
};

export default Home;
