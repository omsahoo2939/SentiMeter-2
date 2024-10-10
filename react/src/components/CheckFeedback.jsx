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
    }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Feedback</h1>
      <ul style={styles.list}>
        {feedbacks.map(feedback => (
          <li key={feedback.id} style={styles.listItem}>
            <Link to={`/feedback/${feedback.id}`} style={styles.link}>
              {feedback.satisfactionManager}
            </Link>
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
    background: 'linear-gradient(135deg, #6a85b6, #bac8e0)',
    color: '#fff',
  },
  title: {
    fontSize: '3rem',
    color: '#ffcc00',
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: '0 0 5px #fff, 0 0 10px #ffcc00',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
    textAlign: 'center',
  },
  listItem: {
    marginBottom: '15px',
    transition: 'transform 0.3s ease',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  },
  link: {
    color: '#33CCFF',
    fontSize: '1.5rem',
    textDecoration: 'none',
    textShadow: '0 0 5px #ffcc00',
    transition: 'color 0.3s ease',
  },
  feedbackText: {
    color: '#fff',
    marginTop: '5px',
  },
};

export default CheckFeedback;
