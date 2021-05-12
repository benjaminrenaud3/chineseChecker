import React from 'react'

const r = Math.sqrt(3)

interface Props {
  scale: number;
  x: number;
  y : number;
  color: string;
}
const Circle = ({scale = 1, x, y, color} : Props) => 
  <circle 
    cx={`calc(16 + ${x*scale})`} 
    cy={`calc(18 + ${y*r*scale})`} 
    r={`${.8 * scale}`}
    fill={color}
  />

export default Circle