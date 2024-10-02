import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Film = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/films/${id}`)
      .then(response => response.json())
      .then(data => setFilm(data));

    fetch(`http://localhost:3001/api/films/${id}/characters`)
      .then(response => response.json())
      .then(data => setCharacters(data));

    fetch(`http://localhost:3001/api/films/${id}/planets`)
      .then(response => response.json())
      .then(data => setPlanets(data));
  }, [id]);

  if (!film) return <div>Loading...</div>;

  return (
    <div>
      <h1>{film.title}</h1>
      <h2>Characters:</h2>
      <ul>
        {characters.map(character => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
      <h2>Planets:</h2>
      <ul>
        {planets.map(planet => (
          <li key={planet.id}>{planet.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Film;