import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout({ children }) {
    return (
        <div style={{   height: '100vh', width: '100%' }}>
            <Navbar />
            {/*<div style={{ display: 'flex', flex: 1 }}>*/}
            {/*    <Sidebar />*/}
            {/*    <main style={{ flex: 1, padding: '20px' }}>*/}
            {/*        {children}*/}
            {/*    </main>*/}
            {/*</div>*/}
        </div>
    );
}

export default Layout;
