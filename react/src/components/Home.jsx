import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = (props) => {
  return (
    <div className="home-container">
      <nav className="nav-bar">
        <Link to="/feedbackForm">
          <button className="nav-button">Give Feedback</button>
        </Link>
        <Link to="/questionForm">
          <button className="nav-button">Ask Questions</button>
        </Link>
        <Link to="/employees">
          <button className="nav-button">Check Feedback</button>
        </Link>
      </nav>
      <h1 className="main-title">Welcome to SentiMeter</h1>
      <div>{props.data}</div>
      <p className="sub-title">Gain meaningful insights through the power of sentiment analysis</p>
    </div>
  );
};

export default Home;
