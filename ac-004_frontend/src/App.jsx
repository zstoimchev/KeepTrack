import {Routes, Route} from 'react-router-dom';
import Layout from './Components/Layout';
import PlanDay from "./Pages/Planday.jsx";
import Calendar from "./Pages/Calendar.jsx";
import StartDay from "./Pages/Startday.jsx";

function App() {
    return (<div>
        <Layout>
            <Routes>
                <Route path="/" element={<Calendar/>}/>
                <Route path="/plan" element={<PlanDay/>}/>
                <Route path="/start" element={<StartDay/>}/>
            </Routes>
        </Layout>
    </div>);
}

export default App;
