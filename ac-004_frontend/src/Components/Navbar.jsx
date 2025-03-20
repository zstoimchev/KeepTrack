import React from "react";
import "./Navbar.css";
import logo from './logo.png';
import home from './home.png';

const Navbar = () => {
    return (
        <div class="header-container">
            <header class="quote-header">
                <h1 class="quote-text">KEEP MOVING FAM, YOU GOT THIS</h1>
                <img src={logo} alt="Logo" class="logo" />
            </header>

            <header class="navbar-header">
                <button class="navbar-tab" id="home-tab">
                    <img src={home} alt="Home" class="navbar-icon" />
                </button>

                <button class="navbar-tab" id="next2-tab">
                    PLAN YOUR DAY
                </button>

                <button class="navbar-tab" id="next3-tab">
                   START YOUR DAY
                </button>
            </header>
        </div>
    );
};

export default Navbar;
