import React from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as TransportIcon} from "../assets/Train.svg"; 
import "../styles/TransportButton.css"; 

const TransportButton = () => {
    const navigate = useNavigate(); 
    return(
        <button className="transportButton-container" onClick={() => navigate("/view-public-transport-route")}>
            <TransportIcon className="transportButton-icon"/>
        </button>
    );
};

export default TransportButton; 