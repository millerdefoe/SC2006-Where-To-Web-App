import React from "react";
import Badge from "./Badge";
import {hexToRgb} from "../context/hexToRgb.js"
import "../styles/CongestionLevelIndicator.css";

const CongestionLevelIndicator = ({CrowdLevel, StopName, BadgeLabel}) => {
    let isBus = false;
    let numericLevel = parseInt(CrowdLevel.toString().replace("%", ""));
    let colour = "#ECE9E9"; 
    if (numericLevel < 40){
        colour = "#7ed957"; // green 
    }
    else if (numericLevel > 70){
        colour = "#ff5757"; // red
    }
    else {
        colour = "#ffbd59"; // yellow
    }

    if (!isNaN(Number(BadgeLabel))){
        isBus = true;
    }

    return(
        <div className="congestionLevelIndicator-container">
            <div className="stopName-container">
                {StopName}
                <div style={{ marginRight: "-27%", marginTop: "-1.5%" }}>
                    <Badge label={BadgeLabel} isBus={isBus}/>
                </div>

            </div>

            <div className="crowdLevel-typography">Crowd Level:</div>

            <div className="crowdIndicator-container" style={{ borderColor: colour, backgroundColor: `rgba(${hexToRgb(colour)}, 0.1)` }}
            >
            <div className="crowdIndicator-bar" 
                style={{ backgroundColor: colour, width: `${numericLevel}%` }}>
                {numericLevel}%
            </div>

            </div>
        </div>
    )
};

export default CongestionLevelIndicator; 