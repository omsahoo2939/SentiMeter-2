import React, { useState } from 'react';

function FeedbackForm() {
    const [feedback, setFeedback] = useState('');
    // const [question, setQuestion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add the current timestamp
        const submission = {
            feedback,
            addedTimestamp: new Date().toISOString()
        };

        try {
            // TODO: Make a POST request to the API to add the sock
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

            const data = await response.json();
            console.log(data);
            // Handle post submission logic (like showing a success message)
        } catch (error) {
            console.error("Error posting data", error);
            // Handle errors here
        }
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
            {/* <label>
                Question:
                <textarea 
                    value={question} 
                    onChange={e => setQuestion(e.target.value)} 
                />
            </label> */}
            <button type="submit">Submit</button>
        </form>
    );
}

export default FeedbackForm;