import React, { useState } from 'react';
import styled from 'styled-components';
import SubmittedPage from './SubmittedPage'; 

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a85b6, #bac8e0);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 450px;
  animation: formEntry 1s ease forwards;
  transform: translateY(30px);
  opacity: 0;

  @keyframes formEntry {
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #f5f5f5;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 1rem;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #88c0d0;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 1rem;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  min-height: 150px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #88c0d0;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #4c5c68, #88c0d0);
  color: white;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #88c0d0, #4c5c68);
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  }
`;

const QuestionForm = () => {
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the current timestamp
    const submission = {
        topic,
        question,
        addedTimestamp: new Date().toISOString()
    };
    setIsSubmitted(true);

    try {
        // TODO: Make a POST request to the API to add the sock
        const response = await fetch(`http://localhost:3001/questionForm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submission),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Handle post submission logic (like showing a success message)
    } catch (error) {
        console.error("Error posting data", error);
        // Handle errors here
    }
};

  const topics = [
    'Work Environment',
    'Project',
    'Career Growth',
    'Team Collaboration',
    'Compensation and Benefits',
    'Other'
  ];

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Topic:', topic);
  //   console.log('Question:', question);

  //   setIsSubmitted(true); 
  // };

  
  if (isSubmitted) {
    return <SubmittedPage />;
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Ask Your Manager</FormTitle>

        <FormGroup>
          <Label htmlFor="topic">Choose a topic:</Label>
          <Select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          >
            <option value="">Select a topic</option>
            {topics.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="question">Your question:</Label>
          <TextArea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </FormGroup>

        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
};

export default QuestionForm;
