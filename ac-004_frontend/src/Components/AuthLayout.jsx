import React from "react";
import illustration from './illustration.png';

function AuthLayout({children}) {
    return (<div style={{display: 'flex', alignItems: 'center', height: '90vh'}}>
        {/* Left side with illustration */}
        <div style={{flex: 1, padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div>
                <img src={illustration} alt="Illustration" style={{maxWidth: '100%', marginLeft: '-40px'}}/>
            </div>
        </div>
        {/* Right side with dynamic content */}
        <div style={{
            flex: 1,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </div>
    </div>);
}

export default AuthLayout;
