import React from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as ViewNearbyCarParksIcon} from "../assets/ViewNearbyCarParks.svg"
import "../styles/ViewCarParksButton.css"; 

const ViewNearbyCarParks = () => {
    const navigate = useNavigate(); 
    return(
        <div className="fastest-route-car-park-container">
            <div className="fastest-route-typography">
                Fastest Route
            </div>
            <div className="view-car-parks-container">
                <button 
                    onClick={() => navigate("/view-car-parks")}
                    className="view-car-parks-button"
                >
                    <ViewNearbyCarParksIcon className="view-car-parks-icon"/>
                </button>
            </div>
        </div>
    );
}

export default ViewNearbyCarParks;