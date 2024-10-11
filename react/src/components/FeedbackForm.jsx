import React, { useState } from 'react';
import styled from 'styled-components';
import SubmittedPage from './SubmittedPageFeedback';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #b23131, #ff4d4d); /* Reddish theme */
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 450px;
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  display: block;
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
    border-color: #ffb3b3; /* Soft red focus border */
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #b23131, #ff4d4d);
  color: white;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #ff4d4d, #b23131); /* Lighter hover */
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  }
`;

const FeedbackForm = (props) => {
    const [feedback, setFeedback] = useState('');
    const [satisfactionManager, setSatisfactionManager] = useState('');
    const [satisfactionTeam, setSatisfactionTeam] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const submittedBy = props.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const sentimentResponse = await fetch(`http://127.0.0.1:5000/analyzeSentiment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "feedback": feedback }),
        });

        if (!sentimentResponse.ok) {
            throw new Error(`HTTP error! status: ${sentimentResponse.status}`);
          }

        const sentimentData = await sentimentResponse.json();
        let sentimentResult = sentimentData.sentiment;
        const submission = {
              feedback,
              satisfactionManager,
              satisfactionTeam,
              submittedBy,
              sentimentResult,
              addedTimestamp: new Date().toISOString()
          };
          setIsSubmitted(true);
            const response = await fetch(`http://localhost:3001/submitForm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submission),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setFeedback('');
            setSatisfactionManager('');
            setSatisfactionTeam('');
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error posting data", error);
        }
    };

    if (isSubmitted) {
        return <SubmittedPage />;
      }

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <FormTitle>Feedback Form</FormTitle>

                <FormGroup>
                    <Label htmlFor="satisfactionManager">How satisfied are you with your manager?</Label>
                    <div>
                        <input type="radio" value="Very Satisfied" checked={satisfactionManager === "Very Satisfied"} onChange={e => setSatisfactionManager(e.target.value)} /> Very Satisfied
                        <input type="radio" value="Moderately Satisfied" checked={satisfactionManager === "Moderately Satisfied"} onChange={e => setSatisfactionManager(e.target.value)} /> Moderately Satisfied
                        <input type="radio" value="Neutral" checked={satisfactionManager === "Neutral"} onChange={e => setSatisfactionManager(e.target.value)} /> Neutral
                        <input type="radio" value="Unsatisfied" checked={satisfactionManager === "Unsatisfied"} onChange={e => setSatisfactionManager(e.target.value)} /> Unsatisfied
                        <input type="radio" value="Very Unsatisfied" checked={satisfactionManager === "Very Unsatisfied"} onChange={e => setSatisfactionManager(e.target.value)} /> Very Unsatisfied
                    </div>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="satisfactionTeam">How satisfied are you with your team?</Label>
                    <div>
                        <input type="radio" value="Very Satisfied" checked={satisfactionTeam === "Very Satisfied"} onChange={e => setSatisfactionTeam(e.target.value)} /> Very Satisfied
                        <input type="radio" value="Moderately Satisfied" checked={satisfactionTeam === "Moderately Satisfied"} onChange={e => setSatisfactionTeam(e.target.value)} /> Moderately Satisfied
                        <input type="radio" value="Neutral" checked={satisfactionTeam === "Neutral"} onChange={e => setSatisfactionTeam(e.target.value)} /> Neutral
                        <input type="radio" value="Unsatisfied" checked={satisfactionTeam === "Unsatisfied"} onChange={e => setSatisfactionTeam(e.target.value)} /> Unsatisfied
                        <input type="radio" value="Very Unsatisfied" checked={satisfactionTeam === "Very Unsatisfied"} onChange={e => setSatisfactionTeam(e.target.value)} /> Very Unsatisfied
                    </div>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="feedback">Feedback:</Label>
                    <TextArea id="feedback" value={feedback} onChange={e => setFeedback(e.target.value)} required />
                </FormGroup>

                <Button type="submit">Submit Feedback</Button>
            </Form>
        </FormContainer>
    );
};

export default FeedbackForm;
