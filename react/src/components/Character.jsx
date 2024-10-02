import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const characterResponse = await fetch(`http://localhost:3001/api/characters/${id}`);
        if (!characterResponse.ok) {
          throw new Error(`Error fetching character: ${characterResponse.statusText}`);
        }
        const characterData = await characterResponse.json();
        setCharacter(characterData);

        const filmsResponse = await fetch(`http://localhost:3001/api/characters/${id}/films`);
        if (!filmsResponse.ok) {
          throw new Error(`Error fetching films: ${filmsResponse.statusText}`);
        }
        const filmsData = await filmsResponse.json();
        setFilms(filmsData);

        const planetResponse = await fetch(`http://localhost:3001/api/characters/${id}/planets`);
        if (!planetResponse.ok) {
          throw new Error(`Error fetching planet: ${planetResponse.statusText}`);
        }
        const planetData = await planetResponse.json();
        setPlanet(planetData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCharacterData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
