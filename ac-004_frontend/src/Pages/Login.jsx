import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Components/AuthLayout.jsx";
import axios from "axios";

function Login({ onLogin }) {
    const navigate = useNavigate();

    // State for form inputs
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/users/login", { email, password });
            if (response.status === 200) {
                const userID = response.data.user.id;
                const userEmail = response.data.user.email;

                console.log("Login successful:", response.data);
                localStorage.setItem("email", userEmail);
                localStorage.setItem("id", userID);

                onLogin(userID, userEmail);
            } else {
                console.error("Login failed:", response);
                alert(response.data.msg);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert(error.response.data.msg);
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <AuthLayout>
            <h1>Welcome back!</h1>
            <p>Enter your credentials to access your account</p>
            <form
                onSubmit={handleLogin}
                style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "300px" }}
            >
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
                        placeholder="Enter your password"
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
                    Log In
                </button>
                <button
                    type="button"
                    onClick={goToRegister}
                    style={{
                        padding: "0.5rem",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Don't have an account? Sign up
                </button>
            </form>
        </AuthLayout>
    );
}

export default Login;
