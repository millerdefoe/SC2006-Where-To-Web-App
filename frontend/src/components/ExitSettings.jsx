import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ExitIcon } from "../assets/X.svg";
import "../styles/ExitSettings.css";

const ExitSettings = () => {
    const navigate = useNavigate();

    const handleExit = () => {
        const lastValidPage = sessionStorage.getItem("lastValidPage") || "/end-location";
        navigate(lastValidPage);
    };

    return (
        <button className="exitIcon-container" onClick={handleExit}>
            <ExitIcon className="exit-icon" />
        </button>
    );
};

export default ExitSettings;
