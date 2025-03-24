import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import PlanDay from "./Pages/PlanDay.jsx";
import Calendar from "./Pages/Calendar.jsx";
import StartDay from "./Pages/Startday.jsx";
import { useState } from "react";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";

function App() {
    // State for userID and userEmail
    const [userID, setUserID] = useState(localStorage.getItem("id"));
    const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));

    const handleLogin = (id, email) => {
        // Save user data to localStorage and update state
        localStorage.setItem("id", id);
        localStorage.setItem("email", email);
        setUserID(id);
        setUserEmail(email);
    };

    const handleLogout = () => {
        // Clear user data from localStorage and reset state
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        setUserID(null);
        setUserEmail(null);
    };

    const isUserLoggedIn = !!userID && !!userEmail; // Check login status dynamically

    return (
        <div>
            {!isUserLoggedIn ? (
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            ) : (
                <div>
                    <Layout onLogout={handleLogout}>
                        <Routes>
                            <Route path="/" element={<Calendar />} />
                            <Route path="/plan" element={<PlanDay />} />
                            <Route path="/start" element={<StartDay />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Layout>
                </div>
            )}
        </div>
    );
}

export default App;
