import React from "react";
import Circle from "./Circle";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { getAllowMoveForDot } from "algo/AlgoMove";

import { getBestMoveForPlayer } from "./algo/AlgoIA"
import {
  makeStyles,
  Box,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import io from "socket.io-client";

const r = Math.sqrt(3);
const scale = 1;

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

const playerList: player[] = [
  { name: "Thomas", color: "red", score: 12 },
  { name: "Thomas", color: "red", score: 12 },
  { name: "Thomas", color: "red", score: 12 },
  { name: "Thomas", color: "red", score: 12 },
  { name: "Thomas", color: "red", score: 12 },
];

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
  { x: -7, y: 1, color: "lightgrey" },
  { x: -5, y: 3, color: "lightgrey" },
  { x: -4, y: 4, color: "lightgrey" },
  { x: -6, y: 2, color: "lightgrey" },
  { x: -2, y: 4, color: "lightgrey" },
  { x: -4, y: 2, color: "lightgrey" },
  { x: -2, y: 2, color: "lightgrey" },
  { x: 0, y: 2, color: "lightgrey" },
  { x: 0, y: 4, color: "lightgrey" },
  { x: 2, y: 4, color: "blue" },
  { x: 4, y: 4, color: "lightgrey" },
  { x: -3, y: 3, color: "lightgrey" },
  { x: -1, y: 3, color: "lightgrey" },
  { x: 1, y: 3, color: "blue" },
  { x: 3, y: 3, color: "lightgrey" },
  { x: 5, y: 3, color: "lightgrey" },
  { x: 2, y: 2, color: "lightgrey" },
  { x: 4, y: 2, color: "lightgrey" },
  { x: 6, y: 2, color: "lightgrey" },
  { x: -5, y: 1, color: "lightgrey" },
  { x: -3, y: 1, color: "lightgrey" },
  { x: -1, y: 1, color: "blue" },
  { x: 1, y: 1, color: "lightgrey" },
  { x: 3, y: 1, color: "lightgrey" },
  { x: 5, y: 1, color: "lightgrey" },
  { x: 7, y: 1, color: "lightgrey" },
  { x: -8, y: 0, color: "lightgrey" },
  { x: -6, y: 0, color: "lightgrey" },
  { x: -4, y: 0, color: "lightgrey" },
  { x: -2, y: 0, color: "lightgrey" },
  { x: 0, y: 0, color: "lightgrey" },
  { x: 2, y: 0, color: "blue" },
  { x: 4, y: 0, color: "lightgrey" },
  { x: 6, y: 0, color: "lightgrey" },
  { x: 8, y: 0, color: "lightgrey" },
  { x: -7, y: -1, color: "lightgrey" },
  { x: -5, y: -1, color: "lightgrey" },
  { x: -3, y: -1, color: "lightgrey" },
  { x: -1, y: -1, color: "blue" },
  { x: 1, y: -1, color: "lightgrey" },
  { x: 3, y: -1, color: "lightgrey" },
  { x: 5, y: -1, color: "lightgrey" },
  { x: 7, y: -1, color: "lightgrey" },
  { x: -6, y: -2, color: "lightgrey" },
  { x: -4, y: -2, color: "blue" },
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

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  playerCells: {
    marginBottom: theme.spacing(3),
  },

  playerCellsBox: {
    height: 10,
    width: 10,
    marginLeft: theme.spacing(2),
  },

  playerCellsFlexBox: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  svgContainer: {
    margin: "auto",
    width: "80%",
    flex: 1,
    maxWidth: 900,
  },
}));

const outierPoints = outier
  .map((o) => [o[0] + 16, o[1] + 18])
  .reduce((x, y) => x + " " + y, "");

const Game = () => {
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const gameId = localStorage.getItem("game");
  const jwt = localStorage.getItem("jwt");
  let socket: any

  React.useEffect(() => {
    console.log("init socket")
    socket = io("ws://127.0.0.1:3000/");
    socket.on("connect", () => {
      console.log("Connected to ws");
      socket.emit("authenticate", "payload");
      socket.emit("setGame", spots);
      socket.emit("getGame", "payload");
      socket.emit("authenticate", jwt);
    });
  }, [])
  if (!gameId) {
    enqueueSnackbar("You need to create or join a game.", {
      variant: "error",
    });
    history.push("/login");
  }

  if (!jwt) {
    enqueueSnackbar("you must be connected", {
      variant: "error",
    });
    history.push("/login");
  }



  return (
    <Box className={classes.container}>
      <Grid item xs={2}>
        <Box style={{ flex: 1, margin: 12 }}>
          <Typography>Game id: {gameId}</Typography>

          <Typography variant={"h5"}>Player list</Typography>
          <Box>
            {playerList.map((e) => (
              <Box className={classes.playerCells}>
                <Typography>{e.name}</Typography>

                <Box className={classes.playerCellsFlexBox}>
                  <Typography>Color </Typography>
                  <Box
                    className={classes.playerCellsBox}
                    style={{ backgroundColor: e.color }}
                  ></Box>
                </Box>
                <Typography>score: {e.score}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Launch the game
        </Button>
      </Grid>
      <Grid item xs={10}>
        <Box className={classes.svgContainer}>
          <svg viewBox="0 0 32 36">
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
                    // console.log(points);
                    console.log(getAllowMoveForDot(points, spots));
                    // console.log(getBestMoveForPlayer("brown", spots))

 

                  
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
        </Box>
      </Grid>
    </Box>
  );
};

export default Game;
