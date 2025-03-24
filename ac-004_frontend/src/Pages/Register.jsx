import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Components/AuthLayout.jsx";
import axios from "axios";

function Register() {
    const navigate = useNavigate();

    // State for form inputs
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        // Optional: Validate passwords before sending request
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/users/register", {
                name,
                surname,
                email,
                password,
            });
            if (response.status === 201) {
                console.log("Registration successful:", response.data);
                alert(response.data.msg);
                goToLogin();
            } else {
                console.error("Registration failed:", response);
                alert(response.data.msg);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert(error.response?.data?.msg || "An error occurred during registration.");
        }
    };

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <AuthLayout>
            <h1>Join us!</h1>
            <p>Create your account</p>
            <form
                onSubmit={handleRegister}
                style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "300px" }}
            >
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update state
                        placeholder="Enter your name"
                        style={{
                            marginBottom: "1rem",
                            padding: "0.5rem",
                            width: "100%",
                            backgroundColor: "#f0f8ff",
                        }}
                    />
                </label>
                <label>
                    Surname:
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)} // Update state
                        placeholder="Enter your surname"
                        style={{
                            marginBottom: "1rem",
                            padding: "0.5rem",
                            width: "100%",
                            backgroundColor: "#f0f8ff",
                        }}
                    />
                </label>
                <label>
                    Email address:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update state
                        placeholder="Enter your email"
                        style={{
                            marginBottom: "1rem",
                            padding: "0.5rem",
                            width: "100%",
                            backgroundColor: "#f0f8ff",
                        }}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update state
                        placeholder="Create a password"
                        style={{
                            marginBottom: "1rem",
                            padding: "0.5rem",
                            width: "100%",
                            backgroundColor: "#f0f8ff",
                        }}
                    />
                </label>
                <label>
                    Repeat password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} // Update state
                        placeholder="Repeat password"
                        style={{
                            marginBottom: "1rem",
                            padding: "0.5rem",
                            width: "100%",
                            backgroundColor: "#f0f8ff",
                        }}
                    />
                </label>
                <button
                    type="submit"
                    style={{
                        padding: "0.5rem",
                        marginBottom: "1rem",
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Sign Up
                </button>
                <button
                    type="button"
                    onClick={goToLogin}
                    style={{
                        padding: "0.5rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Already have an account? Log in
                </button>
            </form>
        </AuthLayout>
    );
}

export default Register;
