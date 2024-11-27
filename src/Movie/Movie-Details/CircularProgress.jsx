import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = ({ percentage }) => {
  return (
    <div style={{ width: 60, height: 50 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#fff",               // White text
          pathColor: "#d9e021",            // Yellow-green circular progress
          trailColor: "#1c1c1c",           // Dark background trail
          textSize: "24px",                // Text size
          strokeLinecap: "round",
          backgroundColor: 'black'        // Rounded end for the circular progress
        })}
      />
    </div>
  );
};

export default CircularProgress;
