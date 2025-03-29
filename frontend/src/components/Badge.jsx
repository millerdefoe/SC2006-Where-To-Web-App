// components/Badge.jsx
import React from "react";
import { mrtLineColors } from "../context/mrtLines";
import "../styles/Badge.css";
import "..//styles/RouteSelection.css";

const Badge = ({ label, isBus }) => {
  const isMRT = !isBus;
  const bgColor = isBus ? "#00D54F" : mrtLineColors[label] || "#ccc";

  return (
    <div className="transportIcon-icon">
        <div className="badge"
            style={{backgroundColor: bgColor
            }}>{label}</div>
        </div>
  );
};

export default Badge;
