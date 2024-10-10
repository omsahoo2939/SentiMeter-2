import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            setSuccess(false);
            return;
        }
        onLoginSuccess(email);
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
            background: 'linear-gradient(135deg, #6a11cb, #2575fc)', 
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
            color: 'white', 
            textAlign: 'center',
            zIndex: 1,
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            background: 'rgba(255, 255, 255, 0.9)', 
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: 1,
        },
        label: {
            marginBottom: '10px',
            fontWeight: 'bold',
            color: '#333',
        },
        input: {
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            padding: '10px',
            backgroundColor: '#6a11cb', 
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#2575fc', 
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
