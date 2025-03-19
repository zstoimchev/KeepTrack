import {Routes, Route} from 'react-router-dom';
import Layout from './Components/Layout';
// import Dashboard from './pages/Dashboard';
// import Settings from './pages/Settings';
import Page1 from './Pages/Page1';

// import Page2 from './pages/Page2';

function App() {
    return (<div style={{width: '100%', height: '100vh', margin: 0}}>
        <Layout>
            <Routes>
                {/*<Route path="/" element={<Dashboard />} />*/}
                {/*<Route path="/settings" element={<Settings />} />*/}
                <Route path="/page1" element={<Page1/>}/>
                {/*<Route path="/page2" element={<Page2 />} />*/}
            </Routes>
        </Layout>
    </div>);
}

export default App;
