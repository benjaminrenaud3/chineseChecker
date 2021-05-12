import React from "react";
import Circle from "./Circle";

const r = Math.sqrt(3);
const scale = 1;

interface Dot {
  x: number;
  y: number;
  color: string;
}
const spots: Dot[] = [
  //bottom
  { x: 0, y: 8, color: "red" },
  { x: -1, y: 7, color: "red" },
  { x: 1, y: 7, color: "red" },
  { x: -2, y: 6, color: "red" },
  { x: 0, y: 6, color: "red" },
  { x: 2, y: 6, color: "red" },
  { x: -3, y: 5, color: "red" },
  { x: -1, y: 5, color: "red" },
  { x: 1, y: 5, color: "red" },
  { x: 3, y: 5, color: "red" },
  // left bot corner
  { x: -12, y: 4, color: "green" },
  { x: -10, y: 4, color: "green" },
  { x: -8, y: 4, color: "green" },
  { x: -6, y: 4, color: "green" },
  { x: -11, y: 3, color: "green" },
  { x: -7, y: 3, color: "green" },
  { x: -10, y: 2, color: "green" },
  { x: -8, y: 2, color: "green" },
  { x: -9, y: 3, color: "green" },
  { x: -9, y: 1, color: "green" },

  //middle
  { x: -7, y: 1, color: "white" },
  { x: -5, y: 3, color: "white" },
  { x: -4, y: 4, color: "white" },
  { x: -6, y: 2, color: "white" },
  { x: -2, y: 4, color: "white" },
  { x: -4, y: 2, color: "white" },
  { x: -2, y: 2, color: "white" },
  { x: 0, y: 2, color: "white" },
  { x: 0, y: 4, color: "white" },
  { x: 2, y: 4, color: "white" },
  { x: 4, y: 4, color: "white" },
  { x: -3, y: 3, color: "white" },
  { x: -1, y: 3, color: "white" },
  { x: 1, y: 3, color: "white" },
  { x: 3, y: 3, color: "white" },
  { x: 5, y: 3, color: "white" },
  { x: 2, y: 2, color: "white" },
  { x: 4, y: 2, color: "white" },
  { x: 6, y: 2, color: "white" },
  { x: -5, y: 1, color: "white" },
  { x: -3, y: 1, color: "white" },
  { x: -1, y: 1, color: "white" },
  { x: 1, y: 1, color: "white" },
  { x: 3, y: 1, color: "white" },
  { x: 5, y: 1, color: "white" },
  { x: 7, y: 1, color: "white" },
  { x: -8, y: 0, color: "white" },
  { x: -6, y: 0, color: "white" },
  { x: -4, y: 0, color: "white" },
  { x: -2, y: 0, color: "white" },
  { x: 0, y: 0, color: "white" },
  { x: 2, y: 0, color: "white" },
  { x: 4, y: 0, color: "white" },
  { x: 6, y: 0, color: "white" },
  { x: 8, y: 0, color: "white" },
  { x: -7, y: -1, color: "white" },
  { x: -5, y: -1, color: "white" },
  { x: -3, y: -1, color: "white" },
  { x: -1, y: -1, color: "white" },
  { x: 1, y: -1, color: "white" },
  { x: 3, y: -1, color: "white" },
  { x: 5, y: -1, color: "white" },
  { x: 7, y: -1, color: "white" },
  { x: -6, y: -2, color: "white" },
  { x: -4, y: -2, color: "white" },
  { x: -2, y: -2, color: "white" },
  { x: 0, y: -2, color: "white" },
  { x: 2, y: -2, color: "white" },
  { x: 4, y: -2, color: "white" },
  { x: 6, y: -2, color: "white" },
  { x: -5, y: -3, color: "white" },
  { x: -3, y: -3, color: "white" },
  { x: -1, y: -3, color: "white" },
  { x: 1, y: -3, color: "white" },
  { x: 3, y: -3, color: "white" },
  { x: 5, y: -3, color: "white" },

  { x: -4, y: -4, color: "white" },
  { x: -2, y: -4, color: "white" },
  { x: 0, y: -4, color: "white" },
  { x: 2, y: -4, color: "white" },

  { x: 4, y: -4, color: "white" },
  //right bottom corner
  { x: 6, y: 4, color: "blue" },
  { x: 8, y: 4, color: "blue" },
  { x: 10, y: 4, color: "blue" },
  { x: 12, y: 4, color: "blue" },
  { x: 7, y: 3, color: "blue" },
  { x: 9, y: 3, color: "blue" },
  { x: 11, y: 3, color: "blue" },
  { x: 9, y: 1, color: "blue" },
  { x: 8, y: 2, color: "blue" },
  { x: 10, y: 2, color: "blue" },

//top right corner
  { x: 9, y: -1, color: "orange" },
  { x: 8, y: -2, color: "orange" },
  { x: 10, y: -2, color: "orange" },
  { x: 6, y: -4, color: "orange" },
  { x: 8, y: -4, color: "orange" },
  { x: 10, y: -4, color: "orange" },
  { x: 12, y: -4, color: "orange" },
  { x: 7, y: -3, color: "orange" },
  { x: 9, y: -3, color: "orange" },
  { x: 11, y: -3, color: "orange" },

  //top left corner
  { x: -10, y: -2, color: "brown" },
  { x: -8, y: -2, color: "brown" },
  { x: -9, y: -1, color: "brown" },
  { x: -11, y: -3, color: "brown" },
  { x: -9, y: -3, color: "brown" },
  { x: -7, y: -3, color: "brown" },
  { x: -12, y: -4, color: "brown" },
  { x: -10, y: -4, color: "brown" },
  { x: -8, y: -4, color: "brown" },
  { x: -6, y: -4, color: "brown" },
  { x: -6, y: -4, color: "brown" },
  





  //top 
  { x: 0, y: -8, color: "pink" },
  { x: -1, y: -7, color: "pink" },
  { x: 1, y: -7, color: "pink" },
  { x: -2, y: -6, color: "pink" },
  { x: 0, y: -6, color: "pink" },
  { x: 2, y: -6, color: "pink" },
  { x: -3, y: -5, color: "pink" },
  { x: -1, y: -5, color: "pink" },
  { x: 1, y: -5, color: "pink" },
  { x: 3, y: -5, color: "pink" },
];

const outier = [
  [0, 8 * r + 2.6],
  [4 + 0.8, 4 * r + 1.4],
  [12 + 2.4, 4 * r + 1.4],
  [8 + 1.6, 0],
  [12 + 2.4, -4 * r - 1.4],
  [4 + 0.8, -4 * r - 1.4],
  [0, -8 * r - 2.6],
  [-4 - 0.8, -4 * r - 1.4],
  [-12 - 2.4, -4 * r - 1.4],
  [-8 - 1.6, 0],
  [-12 - 2.4, 4 * r + 1.4],
  [-4 - 1, 4 * r + 1.4],
];

const outierPoints = outier
  .map((o) => [o[0] + 16, o[1] + 18])
  .reduce((x, y) => x + " " + y, "");

const App = () => (
  <div
    style={{
      fontFamily: "sans-serif",
      textAlign: "center",
      margin: 0,
      padding: 0,
    }}
  >
    <svg viewBox="0 0 32 36" style={{ background: "#000" }}>
      <polygon
        points={outierPoints}
        stroke="black"
        strokeWidth=".5"
        fill="transparent"
        strokeLinejoin="round"
      />
      {spots.map((points, index) => {
        return (
          <Circle
            key={index}
            x={points.x}
            y={points.y}
            scale={scale}
            color={points.color}
          />
        );
      })}
    </svg>
  </div>
);

export default App;
