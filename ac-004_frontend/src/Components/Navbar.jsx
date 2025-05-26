import React, {useEffect, useState} from "react";
import "./Navbar.css";
import logo from './logo.png';
import home from './home.png';
import {Link} from "react-router-dom";

const Navbar = () => {

    const [quote, setQuote] = useState("");

    // this is today quote but needs proxy server
    // const fetchQuote = async () => {
    //     try {
    //         const response = await fetch('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/today');
    //         const data = await response.json();
    //         setQuote(data[0].q); // Display the quote
    //     } catch (error) {
    //         console.error('Error fetching quote:', error);
    //         setQuote("Failure is success in progress!"); // Fallback quote
    //     }
    // };

    // this is random quote
    // const fetchQuote = async () => {
    //     try {
    //         const response = await fetch('https://qapi.vercel.app/api/random');
    //         const data = await response.json();
    //
    //         // Set the quote and author from API response
    //         setQuote(data.quote);
    //     } catch (error) {
    //         console.error('Error fetching quote:', error);
    //         setQuote("The best way to predict the future is to create it."); // Fallback quote
    //     }
    // };

    // useEffect(() => {
    //     fetchQuote();
    // }, []);

    return (<div className="header-container">
        <header className="quote-header">
            <h1 className="quote-text">{quote}</h1>
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