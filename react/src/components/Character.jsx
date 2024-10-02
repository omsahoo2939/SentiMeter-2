import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Character = () => {
  const { id } = useParams();
  const [character, setCharacters] = useState(null);
  const [films, setFilms] = useState([]);
  const [planet, setPlanets] = useState(null);

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

  return (
    <div>
      <h1>{character?.name}</h1>
      <p>Height: {character?.height}</p>
      <p>Mass: {character?.mass}</p>
      <p>Born: {character?.birth_year}</p>

      <p>Homeworld: {planet?.name}</p> 
      
      <h2>Films appeared in:</h2>
      <ul>
        {films.map(film => (
          <li key={film.id}>
            <Link to={`/films/${film.id}`}>{film.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Character;
