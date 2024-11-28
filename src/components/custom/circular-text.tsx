import React from "react";

export default function CircularText({
  text,
  radius,
  padding,
  color,
}: {
  text: string;
  radius: number;
  padding: number;
  color: string;
}) {
  const pathId = "circlePath";

  // Adjust the effective radius by subtracting padding
  const effectiveRadius = radius - padding;
  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      {/* Define the circular path */}
      <defs>
        <path
          id={pathId}
          d={`M ${radius},${radius}
           m -${effectiveRadius},0
           a ${effectiveRadius},${effectiveRadius} 0 1,1 ${
            effectiveRadius * 2
          },0
           a ${effectiveRadius},${effectiveRadius} 0 1,1 -${
            effectiveRadius * 2
          },0`}
        />
      </defs>

      {/* Use textPath to render text along the path */}
      <text fill={color} fontSize="12" textAnchor="middle">
        <textPath href={`#${pathId}`} startOffset="50%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
