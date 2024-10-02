import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    fetch(`/api/characters/${id}`)
      .then(response => response.json())
      .then(data => setCharacter(data));

    fetch(`/api/characters/${id}/films`)
      .then(response => response.json())
      .then(data => setFilms(data));

    fetch(`/api/characters/${id}/planet`)
      .then(response => response.json())
      .then(data => setPlanet(data));
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <div>
      <h1>{character.name}</h1>
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

export default Character;
