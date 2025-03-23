import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Components/AuthLayout.jsx";

function Register() {
    const navigate = useNavigate();

    const handleRegister = () => {
        alert("Registration successful!"); // Simulate registration success
        navigate('/login'); // Redirect to login page
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <AuthLayout>
            <h1>Join us!</h1>
            <p>Create your account</p>
            <form style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px' }}>
                <label>
                    Name:
                    <input type="text" placeholder="Enter your name"
                           style={{
                               marginBottom: '1rem', padding: '0.5rem', width: '100%', backgroundColor: '#f0f8ff'
                           }} />
                </label>
                <label>
                    Surname:
                    <input type="text" placeholder="Enter your surname"
                           style={{
                               marginBottom: '1rem', padding: '0.5rem', width: '100%', backgroundColor: '#f0f8ff'
                           }} />
                </label>
                <label>
                    Email address:
                    <input type="email" placeholder="Enter your email"
                           style={{
                               marginBottom: '1rem', padding: '0.5rem', width: '100%', backgroundColor: '#f0f8ff'
                           }} />
                </label>
                <label>
                    Password:
                    <input type="password" placeholder="Create a password"
                           style={{
                               marginBottom: '1rem', padding: '0.5rem', width: '100%', backgroundColor: '#f0f8ff'
                           }} />
                </label>
                <label>
                    Repeat password:
                    <input type="password" placeholder="Repeat password"
                           style={{
                               marginBottom: '1rem', padding: '0.5rem', width: '100%', backgroundColor: '#f0f8ff'
                           }} />
                </label>
                <button type="button" onClick={handleRegister} style={{
                    padding: '0.5rem',
                    marginBottom: '1rem',
                    backgroundColor: '#4caf50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Sign Up
                </button>
                <button type="button" onClick={goToLogin} style={{
                    padding: '0.5rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Already have an account? Log in
                </button>
            </form>
        </AuthLayout>
    );
}

export default Register;
