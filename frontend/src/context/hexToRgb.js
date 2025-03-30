// src/utils/colorUtils.js

/**
 * Converts a hex color string (e.g. "#ffbd59") to an RGB string (e.g. "255, 189, 89")
 * @param {string} hex - A 6-digit hex color (with or without #)
 * @returns {string} RGB color string
 */
export function hexToRgb(hex) {
    hex = hex.replace("#", "");
  
    if (hex.length !== 6) {
      console.error("Invalid hex color:", hex);
      return "0, 0, 0"; // fallback to black
    }
  
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return `${r}, ${g}, ${b}`;
  }
  