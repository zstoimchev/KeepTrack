import {Routes, Route, Navigate} from 'react-router-dom';
import Layout from './Components/Layout';
import PlanDay from "./Pages/Planday.jsx";
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
        </Routes>) : <Layout>
            <Routes>
                <Route path="/" element={<Calendar/>}/>
                <Route path="/plan" element={<PlanDay/>}/>
                <Route path="/start" element={<StartDay/>}/>
                {/* fallback for unknown paths */}
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </Layout>}
    </div>);
}

export default App;
