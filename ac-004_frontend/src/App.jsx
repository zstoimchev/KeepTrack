import {Routes, Route, Navigate} from 'react-router-dom';
import Layout from './Components/Layout';
import PlanDay from "./Pages/PlanDay.jsx";
import Calendar from "./Pages/Calendar.jsx";
import StartDay from "./Pages/Startday.jsx";
import {useState} from "react";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (<div>
        {!isLoggedIn ? (<Routes>
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)}/>}/>
            <Route path="/register" element={<Register/>}/>
            {/* fallback for unknown paths */}
            <Route path="*" element={<Navigate to="/login" replace/>}/>
        </Routes>) : (<div>
            {/*<Sidebar onLogout={() => setIsLoggedIn(false)}/>*/}
            <Layout onLogout={() => setIsLoggedIn(false)}>
                <Routes>
                    <Route path="/" element={<Calendar onLogout={() => setIsLoggedIn(false)}/>}/>
                    <Route path="/plan" element={<PlanDay/>}/>
                    <Route path="/start" element={<StartDay/>}/>
                    {/* fallback for unknown paths */}
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </Layout></div>)}
    </div>);
}

export default App;
