import React from "react";
import { mrtLineColors, mrtLineNameToPrefix } from "../context/mrtLines";
import "../styles/Badge.css";
import "../styles/RouteSelection.css";

const Badge = ({ label, isBus }) => {
  const isMRT = !isBus;

  // Get MRT line prefix from full name if available
  const linePrefix = isMRT ? mrtLineNameToPrefix[label] || null : null;

  // For MRT: show prefix (e.g. "NS")
  // For Bus: extract short name from parentheses if present (e.g. "CL-R")
  const displayText = isMRT
    ? linePrefix
    : label?.match(/\(([^)]+)\)/)?.[1] || label;

  const bgColor = isBus
    ? "#00D54F"
    : mrtLineColors[linePrefix] || "#ccc";

  return (
    <div className="transportIcon-icon">
      <div
        className="badge"
        title={label} // optional: show full label on hover
        style={{ backgroundColor: bgColor }}
      >
        {displayText || "?"}
      </div>
    </div>
  );
};

export default Badge;
