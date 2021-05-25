import React from "react";

const r = Math.sqrt(3);

interface Props {
  scale: number;
  x: number;
  y: number;
  color: string;
  selected?: boolean;
  isMovableHere?: boolean;
}
const Circle = ({ scale = 1, x, y, color, selected, isMovableHere }: Props) => {
  let fill = color;
  if (selected) fill = "yellow";
  if (isMovableHere) fill = "black";
  return (
    <circle
      cx={`calc(16 + ${x * scale})`}
      cy={`calc(18 + ${y * r * scale})`}
      r={`${0.8 * scale}`}
      fill={fill}
    />
  );
};

export default Circle;