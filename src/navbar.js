import React from 'react';
import "./navbar.css";

function Navbar()
{
    return(
        <div className="navbar-container">
            <div className="navbar">
                <ul>
                    <li className="navbar-logo">Instagram </li>
                    <li className="navbar-searchbar"> Searchbar </li>
                    <li className="navbar-links"> Home </li>
                    <li className="navbar-links"> Messages </li>
                    <li className="navbar-links"> Discover </li>
                    <li className="navbar-links"> Likes </li>
                    <li className="navbar-links"> Profile </li>
                </ul>
            </div>
        </div>
    );

}

export default Navbar;
