import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Planet = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/planets/${id}`)
      .then((response) => response.json())
      .then((data) => setPlanet(data));

    fetch(`http://localhost:3001/api/planets/${id}/films`)
      .then((response) => response.json())
      .then((data) => setFilms(data));

    fetch(`http://localhost:3001/api/planets/${id}/characters`)
      .then((response) => response.json())
      .then((data) => setCharacters(data));
  }, [id]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  if (!planet) return <div style={styles.loading}>Loading Planet Data...</div>;

  return (
    <div style={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      <style>
        {`
          .planet-background {
            width: 100%;
            height: 100vh;
            background: linear-gradient(135deg, #3c1361, #b8a9c9);
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
          }
          
          .planet-background:before {
            content: '';
            position: absolute;
            width: 2px;
            height: 2px;
            background: transparent;
            box-shadow:
              200px 100px #FF66FF, 300px 400px #33CCFF, 500px 200px #FF33FF,
              700px 300px #FF66FF, 800px 50px #33CCFF, 1000px 450px #FF33FF,
              1200px 150px #FF66FF, 1300px 350px #33CCFF, 1400px 500px #FF33FF;
            animation: cosmic-twinkling 10s infinite;
          }

          @keyframes cosmic-twinkling {
            0%, 100% {
              box-shadow:
                200px 100px #FF66FF, 300px 400px #33CCFF, 500px 200px #FF33FF,
                700px 300px #FF66FF, 800px 50px #33CCFF, 1000px 450px #FF33FF,
                1200px 150px #FF66FF, 1300px 350px #33CCFF, 1400px 500px #FF33FF;
            }
            50% {
              box-shadow:
                200px 100px #33CCFF, 300px 400px #FF33FF, 500px 200px #FF66FF,
                700px 300px #33CCFF, 800px 50px #FF33FF, 1000px 450px #FF66FF,
                1200px 150px #33CCFF, 1300px 350px #FF33FF, 1400px 500px #FF66FF;
            }
          }
        `}
      </style>

      {isDarkTheme && <div className="planet-background"></div>}

      <button onClick={toggleTheme} style={styles.themeButton}>
        {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      </button>

      <h1 style={isDarkTheme ? styles.darkTitle : styles.lightTitle}>{planet.name}</h1>

      <div style={styles.infoSection}>
        <h2 style={isDarkTheme ? styles.darkSubTitle : styles.lightSubTitle}>Films:</h2>
        <ul style={styles.list}>
          {films.map((film) => (
            <li key={film._id} style={styles.listItem}>
              <Link to={`/films/${film.id}`} style={styles.link}>
                {film.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.infoSection}>
        <h2 style={isDarkTheme ? styles.darkSubTitle : styles.lightSubTitle}>Characters:</h2>
        <ul style={styles.list}>
          {characters.map((character) => (
            <li key={character._id} style={styles.listItem}>
              <Link to={`/characters/${character.id}`} style={styles.link}>
                {character.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  darkContainer: {
    padding: '30px',
    color: '#FFFFFF',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#1a0033',
  },
  lightContainer: {
    padding: '30px',
    color: '#333',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  darkTitle: {
    fontSize: '3rem',
    color: '#FF66FF',
    textShadow: '0 0 10px #FF33FF, 0 0 20px #33CCFF',
    textAlign: 'center',
    marginBottom: '20px',
  },
  lightTitle: {
    fontSize: '3rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  darkSubTitle: {
    fontSize: '2rem',
    color: '#FF66FF',
    marginTop: '20px',
    textAlign: 'center',
  },
  lightSubTitle: {
    fontSize: '2rem',
    color: '#333',
    marginTop: '20px',
    textAlign: 'center',
  },
  infoSection: {
    marginTop: '20px',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
    textAlign: 'center',
  },
  listItem: {
    marginBottom: '15px',
  },
  link: {
    color: '#33CCFF',
    fontSize: '1.4rem',
    textDecoration: 'none',
    textShadow: '0 0 5px #FF66FF',
    transition: 'color 0.3s ease',
  },
  themeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#FF66FF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    padding: '50px',
  },
};

export default Planet;
