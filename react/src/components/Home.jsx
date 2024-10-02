import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: '#00FF00', 
      textAlign: 'center', 
      padding: '50px', 
      fontFamily: 'Impact, sans-serif',
      width: '100%',
      height: '100vh' 
    }}>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/characters">
          <button 
            style={{ 
              marginRight: '10px', 
              padding: '10px 20px', 
              backgroundColor: '#444', 
              color: '#00FF00', 
              border: '2px solid #00FF00', 
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease' 
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#00FF00', e.currentTarget.style.color = '#000')} 
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#444', e.currentTarget.style.color = '#00FF00')}
          >
            Characters
          </button>
        </Link>

        <Link to="/planets">
          <button 
            style={{ 
              marginRight: '10px', 
              padding: '10px 20px', 
              backgroundColor: '#444',
              color: '#00FF00',
              border: '2px solid #00FF00',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease' // Added transition for color
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#00FF00', e.currentTarget.style.color = '#000')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#444', e.currentTarget.style.color = '#00FF00')}
          >
            Planets
          </button>
        </Link>

        <Link to="/films">
          <button 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#444',
              color: '#00FF00',
              border: '2px solid #00FF00',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease' // Added transition for color
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#00FF00', e.currentTarget.style.color = '#000')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#444', e.currentTarget.style.color = '#00FF00')}
          >
            Films
          </button>
        </Link>
      </nav>

      <h1 style={{ fontSize: '3em', textShadow: '2px 2px #FF0000' }}>Welcome to the Star Wars Database</h1>
      <p style={{ fontSize: '1.5em', marginTop: '20px' }}>Select a category from the navigation bar to explore more.</p>
    </div>
  );
};

export default Home;
