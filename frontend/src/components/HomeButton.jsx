import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomeButton.css";

const HomeButton = () => {
    const navigate = useNavigate();
    return(
        <button className="home-button" onClick={() => navigate("/end-location")}>
            Where to...
        </button>
    );
};

export default HomeButton;