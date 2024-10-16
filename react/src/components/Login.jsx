import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import travelersLogo from '../assets/travelerslogo.png';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            setSuccess(false);
            return;
        }
        const response = await fetch(`http://localhost:3001/api/employees/${email}`);
        if (!response.ok) {
            throw new Error('Data could not be fetched!');
        }
        let json_response = await response.json();
        json_response = json_response[0];
        let success = password === json_response.password;
        onLoginSuccess(json_response.email, json_response.id, json_response.reportsTo, json_response.directReports, success);

        setSuccess(true);
        setError('');
        setEmail('');
        setPassword('');
        navigate('/home');
    };

    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.8))', 
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            position: 'relative',
        },
        logo: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '200px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '350px', 
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '30px', 
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 1,
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'black', 
        },
        label: {
            marginBottom: '10px',
            fontWeight: 'bold',
            color: '#000',
        },
        inputContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        input: {
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #000',
            borderRadius: '4px',
            background: '#f5f5f5',
            width: '280px', 
            boxSizing: 'border-box',
        },
        button: {
            padding: '10px',
            backgroundColor: '#d40000',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            textAlign: 'center',
        },
        buttonHover: {
            backgroundColor: '#a30000',
        },
        error: {
            color: 'red',
            textAlign: 'center',
        },
        success: {
            color: 'green',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <img src={travelersLogo} alt="Travelers Logo" style={styles.logo} />
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.header}>SENTIMETER</h2>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>
                        Email:
                        <input 
                            type="username" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            style={styles.input}
                            required 
                        />
                    </label>
                    <label style={styles.label}>
                        Password:
                        <input 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            style={styles.input} 
                            required 
                        />
                    </label>
                </div>
                <button 
                    type="submit" 
                    style={styles.button}
                    onMouseOver={e => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={e => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Login
                </button>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>Login successful!</p>}
            </form>
        </div>
    );
}

export default Login;
