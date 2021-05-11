import React from 'react'

const r = Math.sqrt(3)

const Circle = ({scale = 1, x, y}) => 
  <circle 
    cx={`calc(16 + ${x*scale})`} 
    cy={`calc(18 + ${y*r*scale})`} 
    r={`${.8 * scale}`}
    fill='white'
  />

export default Circle