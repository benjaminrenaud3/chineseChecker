import { coordDto } from './login/interface';

export interface Dot {
    x: number;
    y: number;
    color: string;
    selected?: boolean;
    isMovableHere?: boolean;
  }
  
  interface player {
    name: string;
    color: string;
    score: number;
  }
  


  const r = Math.sqrt(3);
  
  export const playerList: player[] = [
    { name: "Thomas", color: "red", score: 12 },
    { name: "Thomas", color: "red", score: 12 },
    { name: "Thomas", color: "red", score: 12 },
    { name: "Thomas", color: "red", score: 12 },
    { name: "Thomas", color: "red", score: 12 },
  ];
  
  export const redDot: coordDto[] = [
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
  ]
  
  export const greenDot: coordDto[] = [
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
  ]
  
  export const blueDot: coordDto[] = [
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
  ]
  
  export const orangeDot: coordDto[] = [
  
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
  ]
  
  export const brownDot: coordDto[] = [
  
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
  ]
  
  export const pinkDot: coordDto[] = [
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
  ]
  
  export const spots: Dot[] = [
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
    { x: -2, y: 0, color: "lightgrey" },
    { x: 0, y: 0, color: "lightgrey" },
    { x: 2, y: 0, color: "lightgrey" },
    { x: 4, y: 0, color: "lightgrey" },
    { x: 6, y: 0, color: "lightgrey" },
    { x: 8, y: 0, color: "lightgrey" },
    { x: -7, y: -1, color: "lightgrey" },
    { x: -5, y: -1, color: "lightgrey" },
    { x: -3, y: -1, color: "lightgrey" },
    { x: -1, y: -1, color: "lightgrey" },
    { x: 1, y: -1, color: "lightgrey" },
    { x: 3, y: -1, color: "lightgrey" },
    { x: 5, y: -1, color: "lightgrey" },
    { x: 7, y: -1, color: "lightgrey" },
    { x: -6, y: -2, color: "lightgrey" },
    { x: -4, y: -2, color: "lightgrey" },
    { x: -2, y: -2, color: "lightgrey" },
    { x: 0, y: -2, color: "lightgrey" },
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



  export const greySpots: Dot[] = [
    //bottom
    { x: 0, y: 8, color: "lightgrey" },
    { x: -1, y: 7, color: "lightgrey" },
    { x: 1, y: 7, color: "lightgrey" },
    { x: -2, y: 6, color: "lightgrey" },
    { x: 0, y: 6, color: "lightgrey" },
    { x: 2, y: 6, color: "lightgrey" },
    { x: -3, y: 5, color: "lightgrey" },
    { x: -1, y: 5, color: "lightgrey" },
    { x: 1, y: 5, color: "lightgrey" },
    { x: 3, y: 5, color: "lightgrey" },

    // left bot corner
    { x: -12, y: 4, color: "lightgrey" },
    { x: -10, y: 4, color: "lightgrey" },
    { x: -8, y: 4, color: "lightgrey" },
    { x: -6, y: 4, color: "lightgrey" },
    { x: -11, y: 3, color: "lightgrey" },
    { x: -7, y: 3, color: "lightgrey" },
    { x: -10, y: 2, color: "lightgrey" },
    { x: -8, y: 2, color: "lightgrey" },
    { x: -9, y: 3, color: "lightgrey" },
    { x: -9, y: 1, color: "lightgrey" },
  
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
    { x: -2, y: 0, color: "lightgrey" },
    { x: 0, y: 0, color: "lightgrey" },
    { x: 2, y: 0, color: "lightgrey" },
    { x: 4, y: 0, color: "lightgrey" },
    { x: 6, y: 0, color: "lightgrey" },
    { x: 8, y: 0, color: "lightgrey" },
    { x: -7, y: -1, color: "lightgrey" },
    { x: -5, y: -1, color: "lightgrey" },
    { x: -3, y: -1, color: "lightgrey" },
    { x: -1, y: -1, color: "lightgrey" },
    { x: 1, y: -1, color: "lightgrey" },
    { x: 3, y: -1, color: "lightgrey" },
    { x: 5, y: -1, color: "lightgrey" },
    { x: 7, y: -1, color: "lightgrey" },
    { x: -6, y: -2, color: "lightgrey" },
    { x: -4, y: -2, color: "lightgrey" },
    { x: -2, y: -2, color: "lightgrey" },
    { x: 0, y: -2, color: "lightgrey" },
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
    { x: 6, y: 4, color: "lightgrey" },
    { x: 8, y: 4, color: "lightgrey" },
    { x: 10, y: 4, color: "lightgrey" },
    { x: 12, y: 4, color: "lightgrey" },
    { x: 7, y: 3, color: "lightgrey" },
    { x: 9, y: 3, color: "lightgrey" },
    { x: 11, y: 3, color: "lightgrey" },
    { x: 9, y: 1, color: "lightgrey" },
    { x: 8, y: 2, color: "lightgrey" },
    { x: 10, y: 2, color: "lightgrey" },
  
    //top right corner
    { x: 9, y: -1, color: "lightgrey" },
    { x: 8, y: -2, color: "lightgrey" },
    { x: 10, y: -2, color: "lightgrey" },
    { x: 6, y: -4, color: "lightgrey" },
    { x: 8, y: -4, color: "lightgrey" },
    { x: 10, y: -4, color: "lightgrey" },
    { x: 12, y: -4, color: "lightgrey" },
    { x: 7, y: -3, color: "lightgrey" },
    { x: 9, y: -3, color: "lightgrey" },
    { x: 11, y: -3, color: "lightgrey" },
  
    //top left corner
    { x: -10, y: -2, color: "lightgrey" },
    { x: -8, y: -2, color: "lightgrey" },
    { x: -9, y: -1, color: "lightgrey" },
    { x: -11, y: -3, color: "lightgrey" },
    { x: -9, y: -3, color: "lightgrey" },
    { x: -7, y: -3, color: "lightgrey" },
    { x: -12, y: -4, color: "lightgrey" },
    { x: -10, y: -4, color: "lightgrey" },
    { x: -8, y: -4, color: "lightgrey" },
    { x: -6, y: -4, color: "lightgrey" },
    { x: -6, y: -4, color: "lightgrey" },
  
    //top
    { x: 0, y: -8, color: "lightgrey" },
    { x: -1, y: -7, color: "lightgrey" },
    { x: 1, y: -7, color: "lightgrey" },
    { x: -2, y: -6, color: "lightgrey" },
    { x: 0, y: -6, color: "lightgrey" },
    { x: 2, y: -6, color: "lightgrey" },
    { x: -3, y: -5, color: "lightgrey" },
    { x: -1, y: -5, color: "lightgrey" },
    { x: 1, y: -5, color: "lightgrey" },
    { x: 3, y: -5, color: "lightgrey" },
  ];

  
  export const outier = [
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