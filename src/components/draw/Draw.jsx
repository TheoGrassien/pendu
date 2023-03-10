import "./Draw.css";
import { useEffect, useRef } from "react";

export const Draw = ({ errorCount }) => {
  return (
    <svg
      width="381"
      height="395"
      viewBox="0 0 381 395"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {errorCount > 0 && (
        <rect
          className="shape"
          x="49"
          y="337"
          width="147"
          height="8"
          fill="black"
        />
      )}
      {errorCount > 1 && (
        <rect
          className="shape"
          x="127"
          y="50"
          width="288"
          height="7.99999"
          transform="rotate(90 127 50)"
          fill="black"
        />
      )}
      {errorCount > 2 && (
        <rect
          className="shape"
          x="292"
          y="58"
          width="165"
          height="7.99999"
          transform="rotate(-180 292 58)"
          fill="black"
        />
      )}
      {errorCount > 3 && (
        <rect
          className="shape"
          x="183.225"
          y="57.6569"
          width="80"
          height="7.99999"
          transform="rotate(135 183.225 57.6569)"
          fill="black"
        />
      )}
      {errorCount > 4 && (
        <rect
          className="shape"
          x="284"
          y="98"
          width="40"
          height="8"
          transform="rotate(-90 284 98)"
          fill="black"
        />
      )}
      {errorCount > 5 && (
        <circle
          className="shape"
          cx="288"
          cy="120"
          r="21"
          stroke="black"
          strokeWidth="8"
        />
      )}
      {errorCount > 6 && (
        <rect
          className="shape"
          x="284"
          y="239"
          width="95"
          height="8"
          transform="rotate(-90 284 239)"
          fill="black"
        />
      )}
      {errorCount > 7 && (
        <rect
          className="shape"
          x="288"
          y="178"
          width="48"
          height="8"
          transform="rotate(-30 288 178)"
          fill="black"
        />
      )}
      {errorCount > 8 && (
        <rect
          className="shape"
          width="48"
          height="8"
          transform="matrix(-0.866025 -0.5 -0.5 0.866025 288.569 178)"
          fill="black"
        />
      )}
      {errorCount > 9 && (
        <rect
          className="shape"
          width="48"
          height="8"
          transform="matrix(0.707107 0.707107 0.707107 -0.707107 284 236.657)"
          fill="black"
        />
      )}
      {errorCount > 10 && (
        <rect
          className="shape"
          width="48"
          height="8"
          transform="matrix(-0.707107 0.707107 0.707107 0.707107 285.941 231)"
          fill="black"
        />
      )}
    </svg>
  );
};
