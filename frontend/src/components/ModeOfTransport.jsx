import React from "react";
import "../styles/ModeOfTransport.css";

const ModeOfTransport = ({ Icon }) => {
    return (
        <div className="modeOfTransport-container">
            <div className="transport-label">Mode Of Transport:</div>
            <div className="icon-container">
                <Icon className="icon" />
            </div>
        </div>
    );
};


export default ModeOfTransport;