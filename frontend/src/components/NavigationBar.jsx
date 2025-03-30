import React, {useEffect, useState} from "react";
import {ReactComponent as NavigationBar} from "../assets/NavigationBar.svg";
import {ReactComponent as Arrow} from "../assets/Arrow.svg";
import "../styles/NavigationBar.css";

const NavBar = () => {
    const [startLocation, setStartLocation] = useState("Start Location");
    const [endLocation, setEndLocation] = useState("End Location");

    // Load stored locations from localStorage
    useEffect(() => {
        const storedStart = localStorage.getItem("startLocation");
        const storedEnd = localStorage.getItem("endLocation");

        if (storedStart) setStartLocation(storedStart);
        if (storedEnd) setEndLocation(storedEnd);
    }, []);

    return (
        <div className="nav-container">
            <div className="nav-wrapper">
                <NavigationBar className="nav-bar" />
                <span className="nav-text">{startLocation}</span>
            </div>

            <Arrow className="arrow" alt="Arrow" />

            <div className="nav-wrapper">
                <NavigationBar className="nav-bar" />
                <span className="nav-text">{endLocation}</span>
            </div>
        </div>
    );
};

export default NavBar;