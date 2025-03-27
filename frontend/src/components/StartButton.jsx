import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StartButton.css"; 

const Start= () => {
    const navigate = useNavigate(); 
    return(
        <button className="startButton-button" onClick={() => navigate("/public-transport-nav")}>
            Start!
        </button>
    );
}

export default Start;