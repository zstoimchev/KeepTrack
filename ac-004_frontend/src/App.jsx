import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Layout from "./Components/Layout";
import PlanDay from "./Pages/PlanDay.jsx";
import Calendar from "./Pages/Calendar.jsx";
import StartDay from "./Pages/Startday.jsx";
import { useState } from "react";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Settings from "./Pages/Settings.jsx";

function App() {
    // State for userID and userEmail
    const [userID, setUserID] = useState(localStorage.getItem("id"));
    const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

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

    const handleDateSelect = (day, month, year) => {
        const monthNum = new Date(`${month} 1, ${year}`).getMonth() + 1;
        const formattedDate = `${year}-${String(monthNum).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        setSelectedDate(formattedDate);
        navigate("/plan"); // Navigate to PlanDay
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
                            <Route path="/" element={<Calendar onDateSelect={handleDateSelect}/>} />
                            <Route path="/plan" element={<PlanDay selectedDate={selectedDate}/>} />
                            <Route path="/start" element={<StartDay userID={userID} />} />
                            <Route path="/settings" element={<Settings userID={userID} />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Layout>
                </div>
            )}
        </div>
    );
}

export default App;
