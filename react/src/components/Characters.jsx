import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  background-color: #000;
  color: #f0e68c;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Star Jedi', sans-serif;
  overflow: hidden;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
  letter-spacing: 0.2rem;
  text-shadow: 0 0 10px #f0e68c, 0 0 20px #f0e68c;
`;

const List = styled(motion.ul)`
  list-style: none;
  padding: 0;
`;

const ListItem = styled(motion.li)`
  margin: 1rem 0;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
    text-shadow: 0 0 8px #ffcc00, 0 0 16px #ffcc00;
  }
`;

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/characters')
      .then(response => response.json())
      .then(data => setCharacters(data));
  }, []);

  return (
    <Container>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Characters
      </Title>
      <List
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        {characters.map(character => (
          <ListItem
            key={character.id}
            whileHover={{ scale: 1.1 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Characters;
