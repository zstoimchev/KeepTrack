import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="motivational-text">
                <p>YOU GOT THIS KEEP ON MOVING</p>
            </div>

            <div className="navigation">
                <div className="nav-item">
                    <div className="home-icon"></div>
                    <p>PLAN YOUR DAY</p>
                </div>
                <div className="nav-item">
                    <p>START DAY</p>
                </div>
            </div>
            <div className="logo">
                <div className="logo-icon"></div>
                <p>Keep Track</p>
            </div>
        </div>
    );
};

export default Navbar;
