import React, { useState } from 'react';

function FeedbackForm() {
    const [feedback, setFeedback] = useState('');
    const [satisfactionManager, setSatisfactionManager] = useState('');
    const [satisfactionTeam, setSatisfactionTeam] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add the current timestamp
        const submission = {
            feedback,
            satisfactionManager,
            satisfactionTeam,
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

            <div>
                <p>How satisfied are you with your manager?</p>
                <label>
                    <input 
                        type="radio" 
                        value="Very Satisfied" 
                        checked={satisfactionManager === "Very Satisfied"} 
                        onChange={e => setSatisfactionManager(e.target.value)} 
                    />
                    Very Satisfied
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="Moderately Satisfied" 
                        checked={satisfactionManager === "Moderately Satisfied"} 
                        onChange={e => setSatisfactionManager(e.target.value)} 
                    />
                    Moderately Satisfied
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="Neutral" 
                        checked={satisfactionManager === "Neutral"} 
                        onChange={e => setSatisfactionManager(e.target.value)} 
                    />
                    Neutral
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="Unsatisfied" 
                        checked={satisfactionManager === "Unsatisfied"} 
                        onChange={e => setSatisfactionManager(e.target.value)} 
                    />
                    Unsatisfied
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="Very Unsatisfied" 
                        checked={satisfactionManager === "Very Unsatisfied"} 
                        onChange={e => setSatisfactionManager(e.target.value)} 
                    />
                    Very Unsatisfied
                </label>
            </div>

            <div>
                <p>How satisfied are you with your team?</p>
                <label>
                    <input 
                        type="radio" 
                        value="Very Satisfied" 
                        checked={satisfactionTeam === "Very Satisfied"} 
                        onChange={e => setSatisfactionTeam(e.target.value)} 
                    />
                    Very Satisfied
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="Moderately Satisfied" 
                        checked={satisfactionTeam === "Moderately Satisfied"} 
                        onChange={e => setSatisfactionTeam(e.target.value)} 
                    />
                    Moderately Satisfied
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="Neutral" 
                        checked={satisfactionTeam === "Neutral"} 
                        onChange={e => setSatisfactionTeam(e.target.value)} 
                    />
                    Neutral
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="Unsatisfied" 
                        checked={satisfactionTeam === "Unsatisfied"} 
                        onChange={e => setSatisfactionTeam(e.target.value)} 
                    />
                    Unsatisfied
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="Very Unsatisfied" 
                        checked={satisfactionTeam === "Very Unsatisfied"} 
                        onChange={e => setSatisfactionTeam(e.target.value)} 
                    />
                    Very Unsatisfied
                </label>
            </div>

            <label>
                Feedback:
                <textarea 
                    value={feedback} 
                    onChange={e => setFeedback(e.target.value)} 
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default FeedbackForm;