import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css'


function Layout({children}) {
    return (
    <div className="ContainerColumn">
        
        <div className="AppClass">
            {/*<h1>test</h1>*/}
            <Sidebar />
        </div>

        <div className="RightColumn">
            <div className="Navbar">
                <Navbar/>
            </div>

            <div className="Dynamic">
                <div className="Calendar">
                    <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FBelgrade&showPrint=0&src=Y3VwZXRyZWtpa29AZ21haWwuY29t&src=ZW4uc2xvdmVuaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=bnl0aW1lcy5jb21fODlhaTRpanBiNzMzZ3QyOHJnMjFkMmMyZWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB&color=%230B8043&color=%23E4C441"></iframe>
                </div>
            </div>

        </div>

    </div>);
}

export default Layout;
