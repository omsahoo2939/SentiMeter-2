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
        onLoginSuccess();
        setSuccess(true);
        setError('');
        setEmail('');
        setPassword('');
        
        
        navigate('/home');
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0',
        },
        title: {
            marginBottom: '20px',
            fontSize: '2rem',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        },
        label: {
            marginBottom: '10px',
        },
        input: {
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        error: {
            color: 'red',
        },
        success: {
            color: 'green',
        },
    };

    return (
        <div style={styles.container}>
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
                <button type="submit" style={styles.button}>
                    Login
                </button>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>Login successful!</p>}
            </form>
        </div>
    );
}

export default Login;
