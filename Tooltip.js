// src/components/Tooltip.js
import React from "react";
import "./Tooltip.css"; // Make sure this path is correct

const Tooltip = ({ text, style }) => {
  return (
    <div className="tooltip" style={style}>
      {text}
    </div>
  );
};

export default Tooltip;
