import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StartButton.css"; 

const StartButton = ({duration, route, directions}) => {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate("/public-transport-nav", {
            state: {
                duration,
                route,
                directions
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