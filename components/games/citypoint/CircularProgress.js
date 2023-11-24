import React, { useEffect, useState } from 'react';

const CircularProgress = ({ completed, total }) => {
  const radius = 75;
  const strokeWidth = 20;
  const svgSize = (radius + strokeWidth) * 2;
  const circumference = radius * 2 * Math.PI;

  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  useEffect(() => {
    const progress = total > 0 ? (completed / total) * 100 : 0;
    const newOffset = circumference - progress / 100 * circumference;
    setStrokeDashoffset(newOffset);
  }, [completed, total, circumference]);

  const progressStyle = {
    position: 'fixed',
    top: '400px',
    right: '420px',
    zIndex: 1000,
  };

  const circleStyle = {
    transition: 'stroke-dashoffset 1s ease-out', // Animation en 1 seconde
    strokeDashoffset: strokeDashoffset,
  };

  return (
    <div style={progressStyle}>
      <svg width={svgSize} height={svgSize}>
        <circle
          stroke="#caf0f8"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={circleStyle}
          r={radius}
          cx={svgSize / 2}
          cy={svgSize / 2}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          stroke="#caf0f8"
          dy=".3em"
          fontSize="40"
          fill="#caf0f8"
        >
          {`${completed}/${total}`}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
