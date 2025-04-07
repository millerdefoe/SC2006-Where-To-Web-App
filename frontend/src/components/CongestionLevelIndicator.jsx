import React from "react";
import Badge from "./Badge";
import {hexToRgb} from "../context/hexToRgb.js"
import "../styles/CongestionLevelIndicator.css";

const CongestionLevelIndicator = ({CrowdLevel, StopName, BadgeLabel}) => {
    let isBus = false;
    let congestionLevel = CrowdLevel;
    let colour = "#ECE9E9"; 
    let width = "10";

    if (congestionLevel === "SEA" || congestionLevel === "l"){
        colour = "#7ed957"; // green 
        width = "20";
    }
    else if (congestionLevel === "LSD" || congestionLevel === "h"){
        colour = "#ff5757"; // red
        width = "80";
    }
    else {
        colour = "#ffbd59"; // yellow
        width = "50";
    }

    if (!isNaN(Number(BadgeLabel))){
        isBus = true;
    }

    const mrtCrowdIndicators = {
        l: "Low",
        m: "Medium",
        h: "High",
    };

    const busCrowdIndicators = {
        SEA: "Seats Available",
        SDA: "Standing Available",
        LSD: "Limited Standing",
    };

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
                style={{ backgroundColor: colour, width: `100%` }}>
                {isBus ? (busCrowdIndicators[congestionLevel] || congestionLevel) : (mrtCrowdIndicators[congestionLevel] || congestionLevel)}

            </div>

            </div>
        </div>
    )
};

export default CongestionLevelIndicator; 