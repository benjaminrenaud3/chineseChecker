import React from "react";
import Circle from "./Circle";

import {getAllowMoveForDot} from "./Algo"

const r = Math.sqrt(3);
const scale = 1;

export interface Dot {
  x: number;
  y: number;
  color: string;
  selected?: boolean;
  isMovableHere?: boolean;
}

const spot: Dot[] = [
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
  { x: -7, y: 1, color: "lightgrey" },
  { x: -5, y: 3, color: "lightgrey" },
  { x: -4, y: 4, color: "lightgrey" },
  { x: -6, y: 2, color: "lightgrey" },
  { x: -2, y: 4, color: "lightgrey" },
  { x: -4, y: 2, color: "lightgrey" },
  { x: -2, y: 2, color: "lightgrey" },
  { x: 0, y: 2, color: "lightgrey" },
  { x: 0, y: 4, color: "lightgrey" },
  { x: 2, y: 4, color: "lightgrey" },
  { x: 4, y: 4, color: "lightgrey" },
  { x: -3, y: 3, color: "lightgrey" },
  { x: -1, y: 3, color: "lightgrey" },
  { x: 1, y: 3, color: "lightgrey" },
  { x: 3, y: 3, color: "lightgrey" },
  { x: 5, y: 3, color: "lightgrey" },
  { x: 2, y: 2, color: "lightgrey" },
  { x: 4, y: 2, color: "lightgrey" },
  { x: 6, y: 2, color: "lightgrey" },
  { x: -5, y: 1, color: "lightgrey" },
  { x: -3, y: 1, color: "lightgrey" },
  { x: -1, y: 1, color: "lightgrey" },
  { x: 1, y: 1, color: "lightgrey" },
  { x: 3, y: 1, color: "lightgrey" },
  { x: 5, y: 1, color: "lightgrey" },
  { x: 7, y: 1, color: "lightgrey" },
  { x: -8, y: 0, color: "lightgrey" },
  { x: -6, y: 0, color: "lightgrey" },
  { x: -4, y: 0, color: "lightgrey" },
  { x: -2, y: 0, color: "red" },
  { x: 0, y: 0, color: "lightgrey" },
  { x: 2, y: 0, color: "lightgrey" },
  { x: 4, y: 0, color: "lightgrey" },
  { x: 6, y: 0, color: "lightgrey" },
  { x: 8, y: 0, color: "lightgrey" },
  { x: -7, y: -1, color: "lightgrey" },
  { x: -5, y: -1, color: "red" },
  { x: -3, y: -1, color: "lightgrey" },
  { x: -1, y: -1, color: "lightgrey" },
  { x: 1, y: -1, color: "lightgrey" },
  { x: 3, y: -1, color: "lightgrey" },
  { x: 5, y: -1, color: "lightgrey" },
  { x: 7, y: -1, color: "lightgrey" },
  { x: -6, y: -2, color: "lightgrey" },
  { x: -4, y: -2, color: "red" },
  { x: -2, y: -2, color: "lightgrey" },
  { x: 0, y: -2, color: "red" },
  { x: 2, y: -2, color: "lightgrey" },
  { x: 4, y: -2, color: "lightgrey" },
  { x: 6, y: -2, color: "lightgrey" },
  { x: -5, y: -3, color: "lightgrey" },
  { x: -3, y: -3, color: "lightgrey" },
  { x: -1, y: -3, color: "lightgrey" },
  { x: 1, y: -3, color: "lightgrey" },
  { x: 3, y: -3, color: "lightgrey" },
  { x: 5, y: -3, color: "lightgrey" },

  { x: -4, y: -4, color: "lightgrey" },
  { x: -2, y: -4, color: "lightgrey" },
  { x: 0, y: -4, color: "lightgrey" },
  { x: 2, y: -4, color: "lightgrey" },

  { x: 4, y: -4, color: "lightgrey" },
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

function changeColor (nspots:Dot[], point:Dot) {
  let tab: Dot[] = spot

  tab.forEach(p => {
    (p.x === point.x && p.y === point.y) ? p.selected = true : p.selected = false;
  })

  tab.forEach(p => {
    (nspots.find(element => element.x === p.x && element.y === p.y)) ? (p.isMovableHere = true) && (console.log(p.x, p.y)) : p.isMovableHere = false;
  })
  
  return(tab)
}

const outierPoints = outier
  .map((o) => [o[0] + 16, o[1] + 18])
  .reduce((x, y) => x + " " + y, "");

const App = () => {

  const [spots, setSpots] = React.useState<Dot[]>(spot)

  return (
  <div
    style={{
      fontFamily: "sans-serif",
      textAlign: "center",
      margin: 0,
      padding: 0,
    }}
  >

    <svg viewBox="0 0 32 36" style={{ width: "80%" }}>
      <polygon
        points={outierPoints}
        stroke="black"
        strokeWidth=".5"
        fill="transparent"
        strokeLinejoin="round"
      />
      {spots.map((points, index) => {
        return (
          // eslint-disable-next-line
          <a
            onClick={() => {
              console.log(points)
              setSpots(changeColor(getAllowMoveForDot(points, spots), points))
            }}
          >
            {/*  can't put a div in an polygon. eslint disabled to avoid useless warning */}
            <Circle
              key={index}
              x={points.x}
              y={points.y}
              scale={scale}
              color={points.color}
              selected={points.selected}
              isMovableHere={points.isMovableHere}
            />
          </a>
        );
      })}
    </svg>
  </div>
)};

export default App;