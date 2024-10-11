import React, { useState } from 'react';
import styled from 'styled-components';
import SubmittedPage from './SubmittedPage'; 

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f5f5, #ffffff); // Light background for contrast with form
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.1);
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
  color: #e63946; // Travelers' brand red
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: #333; // Dark text for contrast
  margin-bottom: 0.5rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 1rem;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e63946; // Travelers' brand red
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 1rem;
  color: #333;
  background: rgba(255, 255, 255, 0.9);
  min-height: 150px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e63946; // Travelers' brand red
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #4c5c68, #e63946); // Dark to Travelers' brand red
  color: white;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #e63946, #4c5c68); // Inverted hover effect
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  }
`;

const QuestionForm = (props) => {
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const submittedBy = props.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const submission = {
        topic,
        question,
        submittedBy,
        addedTimestamp: new Date().toISOString()
    };
    setIsSubmitted(true);

    try {
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

    } catch (error) {
        console.error("Error posting data", error);
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
