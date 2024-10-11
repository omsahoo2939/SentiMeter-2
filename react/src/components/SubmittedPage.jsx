import React from 'react';
import styled from 'styled-components';

const SubmittedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.8));
  animation: gradientBG 15s ease infinite;
  background-size: 400% 400%;

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Message = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h2 {
    color: #4c5c68; /* Dark text for contrast */
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #333; /* Dark text */
    font-size: 1.2rem;
    margin: 0;
  }
`;

const SubmittedPage = () => {
  return (
    <SubmittedContainer>
      <Message>
        <h2>Thank You!</h2>
        <p>Your question has been submitted successfully.</p>
      </Message>
    </SubmittedContainer>
  );
};

export default SubmittedPage;
