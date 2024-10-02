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
    <div>
      <h1>Films</h1>
      <ul>
        {films.map(film => (
          <li key={film._id}>
            <Link to={`/films/${film.id}`}>{film.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Films;
