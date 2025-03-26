import React from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as DrivingIcon} from "../assets/Car.svg";
import "../styles/DrivingButton.css"; 

const DrivingButton = () => {
    const navigate = useNavigate(); 
    return(
        <button className="drivingButton-container" onClick={() => navigate("/view-driving-route")}>
            <DrivingIcon className="drivingButton-icon"/>
        </button>
    );
};

export default DrivingButton;