import React from "react";
import Badge from "./Badge";
import "../styles/RouteSelection.css";

const RouteSelection = ({ title, duration, icons = [], onSelect, isSelected, iconMap }) => {
  return (
    <div className="routeSelection-container">
      <div className="routeSelection-title">{title}</div>
      <div className="routeSelection-content" style={{ backgroundColor: isSelected ? "#D9D9D9" : "#ECE9E9" }}>
        <div className="transportIcon-container">
          {icons.map((icon, index) => {
            if (icon.type === "svg") {
              const Icon = iconMap[icon.name]; // ✅ use name → component map
              return (
                <div className="transportIcon-icon" key={index}>
                  {Icon && <Icon />}
                </div>
              );
            } else if (icon.type === "badge") {
              return (
                <div className="transportIcon-icon" key={index}>
                  <Badge label={icon.label} isBus={icon.isBus} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="duration-text">{duration}</div>
        <button className="view-button" onClick={onSelect}>View</button>
      </div>
    </div>
  );
};

export default RouteSelection;
