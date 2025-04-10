import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EndButton.css"; 

const EndButton = () => {
    const navigate = useNavigate(); 

    return(
        <button className="endButton-button"onClick={() => navigate("/end-location")}>
            End Journey
        </button>
    );
}

export default EndButton;