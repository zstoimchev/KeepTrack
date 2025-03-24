import React from "react";
import "./Navbar.css";
import logo from './logo.png';
import home from './home.png';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (<div className="header-container">
        <header className="quote-header">
            <h1 className="quote-text">FAILURE IS SUCCESS IN PROGRESS!</h1>
            <img src={logo} alt="Logo" className="logo"/>
        </header>

        <header className="navbar-header">
            {/*<button className="navbar-tab" id="home-tab">*/}
            {/*    <img src={home} alt="Home" className="navbar-icon"/>*/}
            {/*</button>*/}

            <Link to="/" className="navbar-tab"> <img src={home} className="navbar-icon" alt="Home"/> </Link>
            <Link to="/plan" className="navbar-tab">PLAN YOUR DAY</Link>
            <Link to="/start" className="navbar-tab">START YOUR DAY</Link>

            {/*<button className="navbar-tab" id="next2-tab">*/}
            {/*    PLAN YOUR DAY*/}
            {/*</button>*/}

            {/*<button className="navbar-tab" id="next3-tab">*/}
            {/*    START YOUR DAY*/}
            {/*</button>*/}

        </header>
    </div>);
};

export default Navbar;
