import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomeButton1.css";

const HomeButton1 = () => {
    const navigate = useNavigate();
    return(
        <button className="homeicon-container1" onClick={() => navigate("/end-location")}>
            <div className="homeicon-typography1">Where to!</div>
        </button>
    );
};

export default HomeButton1;