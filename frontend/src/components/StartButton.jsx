import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StartButton.css"; 

const StartButton = ({routeData}) => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/public-transport-nav", {
            state: {
                routeData
            }
        });
    };
    return(
        <button className="startButton-button" onClick={handleClick}>
            Start!
        </button>
    );
}

export default StartButton;