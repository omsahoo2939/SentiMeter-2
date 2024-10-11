import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CheckFeedback = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/feedbacks')
      .then(response => response.json())
      .then(data => setFeedbacks(data.filter(x => props.directReports.includes(x.submittedBy))));
    
    fetch('http://localhost:3001/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data.filter(x => props.directReports.includes(x.submittedBy))));
  }, [props.directReports]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Feedback</h1>
      <ul style={styles.list}>
        {feedbacks.map(feedback => (
          <li key={feedback.id} style={styles.listItem}>
            <Link to={`/feedback/${feedback.id}`} style={styles.link}>
              Manager Satisfaction: {feedback.satisfactionManager}
            </Link>
            <p style={styles.feedbackText}>Sentiment: {feedback.sentimentResult}</p>
            <p style={styles.feedbackText}>Team Satisfaction: {feedback.satisfactionTeam}</p>
            <p style={styles.feedbackText}>{feedback.feedback}</p>
          </li>
        ))}
      </ul>
      <h1 style={styles.title}>Questions</h1>
      <ul style={styles.list}>
        {questions.map(question => (
          <li key={question.id} style={styles.listItem}>
            <Link to={`/question/${question.id}`} style={styles.link}>
              {question.question}
            </Link>
          </li>
        ))}
      </ul>
      <div className="twinkling-stars"></div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    background: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.8))',
  },
  title: {
    fontSize: '3rem',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
    textAlign: 'center',
  },
  listItem: {
    marginBottom: '15px',
    transition: 'transform 0.3s ease',
    background: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)', 
    color: '#fff',
    fontSize: '1.2rem',
    textAlign: 'left',
  },
  link: {
    color: '#fff',
    fontSize: '1.5rem',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  },
  feedbackText: {
    color: '#fff',
    marginTop: '10px',
    fontSize: '1rem',
    lineHeight: '1.5',
  },
};

export default CheckFeedback;
