import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Components/AuthLayout.jsx";

function Login({ onLogin }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        onLogin(); // Mock login for testing
        navigate('/'); // Redirect after login
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <AuthLayout>
            <h1>Welcome back!</h1>
            <p>Enter your credentials to access your account</p>
            <form style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px' }}>
                <label>
                    Email address:
                    <input type="email" placeholder="Enter your email"
                           style={{
                               marginBottom: '1rem', padding: '0.5rem', width: '100%', backgroundColor: '#f0f8ff'
                           }} />
                </label>
                <label>
                    Password:
                    <input type="password" placeholder="Enter your password"
                           style={{
                               marginBottom: '1rem', padding: '0.5rem', width: '100%', backgroundColor: '#f0f8ff'
                           }} />
                </label>
                <button type="button" onClick={handleLogin} style={{
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Log In
                </button>
                <button type="button" onClick={goToRegister} style={{
                    padding: '0.5rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Don't have an account? Sign up
                </button>
            </form>
        </AuthLayout>
    );
}

export default Login;
