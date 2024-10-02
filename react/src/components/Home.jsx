import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <nav className="nav-bar">
        <Link to="/characters">
          <button className="nav-button">Characters</button>
        </Link>
        <Link to="/planets">
          <button className="nav-button">Planets</button>
        </Link>
        <Link to="/films">
          <button className="nav-button">Films</button>
        </Link>
      </nav>
      <h1 className="main-title">Welcome to the Star Wars Database</h1>
      <p className="sub-title">Select a category from the navigation bar to explore more.</p>
    </div>
  );
};

export default Home;
