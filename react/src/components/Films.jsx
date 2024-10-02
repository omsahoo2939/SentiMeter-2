import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Films = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/films')
      .then(response => response.json())
      .then(data => setFilms(data));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Films</h1>
      <ul style={styles.list}>
        {films.map(film => (
          <li key={film._id} style={styles.listItem}>
            <Link to={`/films/${film.id}`} style={styles.link}>
              {film.title}
            </Link>
          </li>
        ))}
      </ul>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #001f3f, #005f9f);
            color: #ffffff;
          }
          h1 {
            text-align: center;
            text-shadow: 0 0 10px #fff, 0 0 20px #0ff;
            margin-bottom: 40px;
            font-size: 3rem;
          }
          .twinkling-stars {
            position: absolute;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: -1;
            pointer-events: none;
          }
          .twinkling-stars::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            box-shadow: 
              100px 150px #FFFFFF, 300px 80px #FFFFFF, 450px 300px #FFFFFF,
              600px 200px #FFFFFF, 800px 100px #FFFFFF, 900px 400px #FFFFFF;
            animation: twinkling 1.5s infinite alternate;
          }
          @keyframes twinkling {
            0% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
      <div className="twinkling-stars"></div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  title: {
    fontSize: '3rem',
    color: '#ffcc00',
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: '0 0 5px #fff, 0 0 10px #ffcc00',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
    textAlign: 'center',
  },
  listItem: {
    marginBottom: '15px',
    transition: 'transform 0.3s ease',
  },
  link: {
    color: '#33CCFF',
    fontSize: '1.5rem',
    textDecoration: 'none',
    textShadow: '0 0 5px #ffcc00',
    transition: 'color 0.3s ease',
  },
};

export default Films;
