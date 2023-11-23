import React from 'react';

const CircularProgress = ({ completed, total }) => {
  const radius = 75; // Rayon du cercle
  const strokeWidth = 20; // Épaisseur du trait
  const svgSize = (radius + strokeWidth) * 2; // Taille du SVG
  const circumference = radius * 2 * Math.PI;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  const offset = circumference - progress / 100 * circumference;

  return (
    <svg width={svgSize} height={svgSize}>
      <circle
        stroke="#caf0f8"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset: offset }}
        r={radius}
        cx={svgSize / 2}
        cy={svgSize / 2}
      />
      <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf" dy=".3em" fontSize="40">
        {`${completed}/${total}`}
      </text>
    </svg>
  );
};

export default CircularProgress;
