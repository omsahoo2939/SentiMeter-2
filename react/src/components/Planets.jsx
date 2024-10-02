import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Planets = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/planets')
      .then(response => response.json())
      .then(data => setPlanets(data));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Planets</h1>
      <ul style={styles.list}>
        {planets.map(planet => (
          <li key={planet._id} style={styles.listItem}>
            <Link to={`/planets/${planet.id}`} style={styles.link}>
              {planet.name}
            </Link>
          </li>
        ))}
      </ul>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1c1c1c, #2e2e2e);
            color: #ffffff;
          }
          h1 {
            text-align: center;
            text-shadow: 0 0 10px #fff, 0 0 20px #f39c12;
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
    color: '#f39c12',
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: '0 0 5px #fff, 0 0 10px #f39c12',
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
    color: '#00ccff',
    fontSize: '1.5rem',
    textDecoration: 'none',
    textShadow: '0 0 5px #f39c12',
    transition: 'color 0.3s ease',
  },
};

export default Planets;
