import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Character = () => {
  const { id } = useParams();
  const [character, setCharacters] = useState(null);
  const [films, setFilms] = useState([]);
  const [planet, setPlanets] = useState(null);
  const [darkTheme, setDarkTheme] = useState(true); 
  const toggleTheme = () => setDarkTheme(!darkTheme);
  useEffect(() => {
    fetch(`http://localhost:3001/api/characters/${id}`)
      .then(response => response.json())
      .then(data => setCharacters(data));

    fetch(`http://localhost:3001/api/characters/${id}/films`)
      .then(response => response.json())
      .then(data => setFilms(data));

    fetch(`http://localhost:3001/api/characters/${id}/planets`)
      .then(response => response.json())
      .then(data => setPlanets(data));
  }, [id]);

  
  const darkThemeStyles = {
    backgroundColor: 'black',
    color: 'white',
    background: 'radial-gradient(circle, #020024, #090979, #0f0c29)',
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center',
    position: 'relative', 
    overflow: 'hidden',   
  };

  const lightThemeStyles = {
    backgroundColor: '#f0f8ff',
    color: 'black',
    background: 'linear-gradient(to bottom, #fffcdc, #f0e5d8, #e2e8e6)',
    minHeight: '100vh',
    padding: '20px',
    textAlign: 'center',
  };

  const starFieldStyles = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
    boxShadow: '0 0 1px white, 2px 2px 1px white, 4px 4px 1px white, 6px 6px 1px white, 8px 8px 1px white',
    animation: 'star-animation 50s linear infinite',
    zIndex: 0, 
  };

  const titleStyles = {
    fontSize: '3rem',
    margin: '20px 0',
    position: 'relative', 
    zIndex: 1,
  };

  const darkTitleStyles = {
    color: '#00e1ff',
    textShadow: '0 0 10px #00e1ff, 0 0 20px #00e1ff, 0 0 40px #00e1ff',
  };

  const lightTitleStyles = {
    color: '#3e82fc',
    textShadow: '0 0 8px #3e82fc, 0 0 15px #82a9fc',
  };

  const filmsTitleStyles = darkTheme
    ? { color: '#ff4f4f', textShadow: '0 0 10px #ff4f4f, 0 0 20px #ff4f4f, 0 0 40px #ff4f4f' }
    : { color: '#ffab4f', textShadow: '0 0 8px #ffab4f, 0 0 15px #ffdb82' };

  const buttonStyles = {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '20px',
    position: 'relative',
    zIndex: 1, 
  };

  const buttonHoverStyles = {
    backgroundColor: '#61dafb',
  };

  const listStyles = {
    listStyle: 'none',
    padding: '0',
    position: 'relative', 
    zIndex: 1, 
  };

  const listItemStyles = {
    margin: '0.5rem 0',
  };

  return (
    <div style={darkTheme ? darkThemeStyles : lightThemeStyles}>
      <div style={darkTheme ? starFieldStyles : {}}></div>

      <button
        onClick={toggleTheme}
        style={buttonStyles}
        onMouseEnter={e => (e.target.style.backgroundColor = '#61dafb')}
        onMouseLeave={e => (e.target.style.backgroundColor = '#282c34')}
      >
        {darkTheme ? 'Switch to Light/Planet Theme' : 'Switch to Dark/Space Theme'}
      </button>

      <h1 style={{ ...titleStyles, ...(darkTheme ? darkTitleStyles : lightTitleStyles) }}>
        {character?.name}
      </h1>
      <p>Height: {character?.height}</p>
      <p>Mass: {character?.mass}</p>
      <p>Born: {character?.birth_year}</p>

      <p>Homeworld: {planet?.name}</p>

      <h2 style={filmsTitleStyles}>Films appeared in:</h2>
      <ul style={listStyles}>
        {films.map(film => (
          <li key={film.id} style={listItemStyles}>
            <Link to={`/films/${film.id}`}>{film.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Character;
