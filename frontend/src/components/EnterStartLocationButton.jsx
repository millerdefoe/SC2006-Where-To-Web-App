import React from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as EnterStartLocationIcon} from "../assets/EnterStartLocationIcon.svg";
import "../styles/EnterStartLocationButton.css";

const EnterStartLocationButton = () => {
    const navigate = useNavigate(); 
    return(
        <button className="enterStartLocation-container" onClick={() => navigate("/input-TPT-mode")}>
            <EnterStartLocationIcon className="enterStartLocation-icon" />
        </button>
    );
}; 

export default EnterStartLocationButton;