import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Films = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/films/${id}`)
      .then(response => response.json())
      .then(data => setCharacter(data));

    fetch(`http://localhost:3001/api/films/${id}/characters`)
      .then(response => response.json())
      .then(data => setFilms(data));

    fetch(`http://localhost:3001/api/films/${id}/planet`)
      .then(response => response.json())
      .then(data => setPlanet(data));
  }, [id]);

  if (!films) return <div>Loading...</div>;

  return (
    <div>
      <h1>{films?.name}</h1>
      <p>Homeworld: {planet?.name}</p>
      <h2>Films:</h2>
      <ul>
        {films.map(film => (
          <li key={film._id}>{film.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Films;
