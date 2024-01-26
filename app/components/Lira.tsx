'use client';

import React from "react";

const LiraIcon = ({ size = 24 }) => (
  <span style={{ 
    
        fontSize: `${size}px`,
        color: "#4a5568",  
        position: "absolute",
        top: "18px",
        left: "15px",
   }}>
    &#8378;
  </span>
);

export default LiraIcon;
