import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css'


function Layout({children, onLogout}) {
    return (<div className="ContainerColumn">

        <div className="AppClass">
            <Sidebar onLogout={onLogout}/>
        </div>
        <div className="RightColumn">
            <div className="Navbar">
                <Navbar/>
            </div>
            <div className="Dynamic">
                <div className="Calendar">
                    {children}
                </div>
            </div>
        </div>
    </div>);
}

export default Layout;
