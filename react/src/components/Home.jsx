import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/characters">
          <button style={{ marginRight: '10px' }}>Characters</button>
        </Link>
        <Link to="/planets">
          <button style={{ marginRight: '10px' }}>Planets</button>
        </Link>
        <Link to="/films">
          <button>Films</button>
        </Link>
      </nav>
      <h1>Welcome to the Star Wars Database</h1>
      <p>Select a category from the navigation bar to explore more.</p>
    </div>
  );
};

export default Home;
