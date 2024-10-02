import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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

  return (
    <div>
      <h1>{film.title}</h1>
      <p><strong>Episode:</strong> {film.episode_id}</p>
      <p><strong>Director:</strong> {film.director}</p>
      <p><strong>Producer:</strong> {film.producer}</p>
      <p><strong>Release Date:</strong> {new Date(film.release_date).toDateString()}</p>
      <h2>Opening Crawl:</h2>
      <p>{film.opening_crawl}</p>
      <h2>Characters:</h2>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
      <h2>Planets:</h2>
      <ul>
        {planets.map(planet => (
          <li key={planet.id}>
            <Link to={`/planets/${planet.id}`}>{planet.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Film;
