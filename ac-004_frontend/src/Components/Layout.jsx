import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css'

function Layout({ children }) {
    return (
      <div className="ContainerColumn">
        <div className="AppClass">
          {/* Sidebar */}
          <Sidebar />
        </div>
  
        <div className="AppClass RightColumn">
          <div className="Navbar">
            <Navbar />
          </div>
          <div className="DynamicContent">
            {children}
          </div>
        </div>
      </div>
    );
  }
export default Layout;
