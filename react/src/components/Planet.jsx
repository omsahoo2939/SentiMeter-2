import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Planet = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/planets/${id}`)
      .then(response => response.json())
      .then(data => setPlanet(data));

    fetch(`http://localhost:3001/api/planets/${id}/films`)
      .then(response => response.json())
      .then(data => setFilms(data));

    fetch(`http://localhost:3001/api/planets/${id}/characters`)
      .then(response => response.json())
      .then(data => setCharacters(data));
  }, [id]);

  if (!planet) return <div>Loading...</div>;

  return (
    <div>
      <h1>{planet.name}</h1>
      <h2>Films:</h2>
      <ul>
        {films.map(film => (
          <li key={film._id}>{film.title}</li>
        ))}
      </ul>
      <h2>Characters:</h2>
      <ul>
        {characters.map(character => (
          <li key={character._id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Planet;