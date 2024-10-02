import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Film = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/films/${id}`)
      .then((response) => response.json())
      .then((data) => setFilm(data));

    fetch(`http://localhost:3001/api/films/${id}/characters`)
      .then((response) => response.json())
      .then((data) => setCharacters(data));

    fetch(`http://localhost:3001/api/films/${id}/planets`)
      .then((response) => response.json())
      .then((data) => setPlanets(data));
  }, [id]);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div style={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      <style>
        {`
          .stars {
            width: 100%;
            height: 100vh;
            background: transparent;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            overflow: hidden;
          }

          .stars:before {
            content: '';
            position: absolute;
            width: 1px;
            height: 1px;
            background: transparent;
            box-shadow:
              100px 200px #ffffff, 150px 300px #FFD700, 200px 150px #FFA500,
              300px 100px #ffffff, 400px 50px #FFD700, 500px 400px #FFA500,
              600px 250px #ffffff, 700px 350px #FFD700, 800px 450px #FFA500,
              900px 200px #ffffff, 1000px 150px #FFD700, 1100px 300px #FFA500;
            animation: twinkling 5s infinite;
          }

          @keyframes twinkling {
            0% {
              box-shadow:
                100px 200px #ffffff, 150px 300px #FFD700, 200px 150px #FFA500,
                300px 100px #ffffff, 400px 50px #FFD700, 500px 400px #FFA500,
                600px 250px #ffffff, 700px 350px #FFD700, 800px 450px #FFA500,
                900px 200px #ffffff, 1000px 150px #FFD700, 1100px 300px #FFA500;
            }
            50% {
              box-shadow:
                100px 200px #FFA500, 150px 300px #ffffff, 200px 150px #FFD700,
                300px 100px #FFA500, 400px 50px #ffffff, 500px 400px #FFD700,
                600px 250px #FFA500, 700px 350px #ffffff, 800px 450px #FFD700,
                900px 200px #FFA500, 1000px 150px #ffffff, 1100px 300px #FFD700;
            }
            100% {
              box-shadow:
                100px 200px #ffffff, 150px 300px #FFD700, 200px 150px #FFA500,
                300px 100px #ffffff, 400px 50px #FFD700, 500px 400px #FFA500,
                600px 250px #ffffff, 700px 350px #FFD700, 800px 450px #FFA500,
                900px 200px #ffffff, 1000px 150px #FFD700, 1100px 300px #FFA500;
            }
          }
        `}
      </style>

      {isDarkTheme && <div className="stars"></div>}

      <button onClick={toggleTheme} style={styles.themeButton}>
        {isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      </button>

      <h1 style={isDarkTheme ? styles.darkTitle : styles.lightTitle}>{film?.title}</h1>
      <p style={styles.info}>
        <strong>Episode:</strong> {film?.episode_id}
      </p>
      <p style={styles.info}>
        <strong>Director:</strong> {film?.director}
      </p>
      <p style={styles.info}>
        <strong>Producer:</strong> {film?.producer}
      </p>
      <p style={styles.info}>
        <strong>Release Date:</strong> {new Date(film?.release_date).toDateString()}
      </p>

      <h2 style={isDarkTheme ? styles.darkSubTitle : styles.lightSubTitle}>Opening Crawl:</h2>
      <p style={styles.openingCrawl}>{film?.opening_crawl}</p>

      <h2 style={isDarkTheme ? styles.darkSubTitle : styles.lightSubTitle}>Characters:</h2>
      <ul style={styles.list}>
        {characters.map((character) => (
          <li key={character.id} style={styles.listItem}>
            <Link to={`/characters/${character.id}`} style={styles.link}>
              {character.name}
            </Link>
          </li>
        ))}
      </ul>

      <h2 style={isDarkTheme ? styles.darkSubTitle : styles.lightSubTitle}>Planets:</h2>
      <ul style={styles.list}>
        {planets.map((planet) => (
          <li key={planet.id} style={styles.listItem}>
            <Link to={`/planets/${planet.id}`} style={styles.link}>
              {planet.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  darkContainer: {
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  lightContainer: {
    color: '#333',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  darkTitle: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#FFD700',
    textShadow: '0 0 10px #FFD700, 0 0 20px #FFA500',
  },
  lightTitle: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#000',
  },
  darkSubTitle: {
    fontSize: '2rem',
    marginTop: '30px',
    marginBottom: '10px',
    color: '#FFFFFF',
    textShadow: '0 0 5px #FFA500',
  },
  lightSubTitle: {
    fontSize: '2rem',
    marginTop: '30px',
    marginBottom: '10px',
    color: '#333',
  },
  info: {
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  openingCrawl: {
    fontStyle: 'italic',
    maxWidth: '600px',
    margin: '0 auto',
    fontSize: '1.1rem',
    lineHeight: '1.5',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  listItem: {
    margin: '10px 0',
  },
  link: {
    color: '#FFA500',
    textDecoration: 'none',
    fontSize: '1.2rem',
    textShadow: '0 0 5px #FFFFFF',
  },
  themeButton: {
    margin: '20px',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
    background: '#FFD700',
    border: 'none',
    color: '#000',
  },
};

export default Film;
