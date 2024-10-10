import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        onLoginSuccess(json_response.email,json_response.id,json_response.reportsTo,json_response.directReports);


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
            background: 'linear-gradient(135deg, #6a85b6, #bac8e0)', 
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            position: 'relative',
            overflow: 'hidden',
        },
        texture: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://www.transparenttextures.com/patterns/white-paper.png)', 
            opacity: 0.1,
            zIndex: 0,
        },
        title: {
            marginBottom: '20px',
            fontSize: '2rem',
            color: '#f5f5f5', 
            textAlign: 'center',
            zIndex: 1,
            position: 'absolute',
            top: '30%', 
            left: '50%',
            transform: 'translateX(-50%)',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 1,
            marginTop: '60px', 
        },
        label: {
            marginBottom: '10px',
            fontWeight: 'bold',
            color: 'rgba(255, 255, 255, 0.7)', 
        },
        input: {
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid rgba(255, 255, 255, 0.3)', 
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.9)', 
        },
        button: {
            padding: '10px',
            backgroundColor: 'rgba(100, 100, 100, 0.7)', 
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            textAlign: 'center',
        },
        buttonHover: {
            backgroundColor: 'rgba(120, 120, 120, 0.9)', 
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
            <div style={styles.texture}></div>
            <h2 style={styles.title}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Email:
                    <input 
                        type="email" 
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
