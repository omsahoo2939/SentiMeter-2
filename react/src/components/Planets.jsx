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
    <div>
      <h1>Planets</h1>
      <ul>
        {planets.map(planet => (
          <li key={planet._id}>
            <Link to={`/planets/${planet.id}`}>{planet.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Planets;
