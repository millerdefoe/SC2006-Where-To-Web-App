import React from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as DrivingIcon} from "../assets/Car.svg";
import "../styles/DrivingButton.css"; 

const DrivingButton = () => {
    const navigate = useNavigate(); 
    return(
        <button clasName="drivingButton-container" onClick={() => navigate("/nearest-avail-carpark")}>
            <DrivingButton className="drivingButton-icon"/>
        </button>
    );
};

export default DrivingButton;