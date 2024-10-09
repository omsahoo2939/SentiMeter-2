import React, { useState } from 'react';

function FeedbackForm() {
    const [feedback, setFeedback] = useState('');
    const [question, setQuestion] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Feedback submitted: ${feedback}\nQuestion submitted: ${question}`);
        setFeedback('');
        setQuestion('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Feedback:
                <textarea 
                    value={feedback} 
                    onChange={e => setFeedback(e.target.value)} 
                />
            </label>
            <label>
                Question:
                <textarea 
                    value={question} 
                    onChange={e => setQuestion(e.target.value)} 
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default FeedbackForm;