import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CongestionLevelButton.css"; 

const CongestionLevelButton = () => {
    const navigate = useNavigate(); 
    return(
        <div className="congestionLevelButton-container">
            Routes
            <button className="congestionLevelButton-button" onClick={() => navigate("/display-congestion-levels")}>
                View Congestion Levels
            </button>
        </div>
    );
}

export default CongestionLevelButton;