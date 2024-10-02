import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/characters')
      .then(response => response.json())
      .then(data => setCharacters(data));
  }, []);

  return (
    <div>
      <h1>Characters</h1>
      <ul>
        {characters.map(character => (
          <li key={character._id}>
            <Link to={`/characters/${character._id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characters;
