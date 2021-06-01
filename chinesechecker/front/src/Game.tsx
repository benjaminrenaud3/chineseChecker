import React from "react";
import Circle from "./Circle";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getAllowMoveForDot } from "./algo/AlgoMove";
import { getBestMoveForPlayer } from "./algo/AlgoIA";
import { makeStyles, Box, Grid, Typography, Button } from "@material-ui/core";
import io from "socket.io-client";
import {
  outier,
  redDot,
  playerList,
  spots,
  Dot,
  greenDot,
  pinkDot,
  brownDot,
  orangeDot,
  blueDot,
} from "./gameConst";

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

const scale = 1;

const outierPoints = outier
  .map((o) => [o[0] + 16, o[1] + 18])
  .reduce((x, y) => x + " " + y, "");

const Game = () => {
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const gameId = localStorage.getItem("game");
  const jwt = localStorage.getItem("jwt");
  const playerId = localStorage.getItem("playerId");
  let socket: any;
  const [gameSpot, setGameSpot] = React.useState<Dot[]>(spots);
  const [reload, setReload] = React.useState<any>(false);
  const [lastSelected, setLastSelected] = React.useState<Dot>();
  const [playerList, setPlayerList] = React.useState<[]>([]);
  function updateGame() {
    socket.emit("getDotGame", gameId);

    socket.emit("getGame", gameId);
    socket.on("sendGame", (game) => {
      const gamePlayer = game.player;
      console.log(gamePlayer)

      let moves: any;
      if (gamePlayer.length === 1) {
        moves = getBestMoveForPlayer("green", gameSpot);
        socket.emit("changeDotPos", [3, gameId, moves[0], moves[1]]);
        moves = getBestMoveForPlayer("blue", gameSpot);
        socket.emit("changeDotPos", [4, gameId, moves[0], moves[1]]);
        moves = getBestMoveForPlayer("pink", gameSpot);
        socket.emit("changeDotPos", [5, gameId, moves[0], moves[1]]);
        moves = getBestMoveForPlayer("brown", gameSpot);
        socket.emit("changeDotPos", [6, gameId, moves[0], moves[1]]);
        moves = getBestMoveForPlayer("orange", gameSpot);
        socket.emit("changeDotPos", [7, gameId, moves[0], moves[1]]);
      }

      if (gamePlayer.length === 2) {
        moves = getBestMoveForPlayer("blue", gameSpot);
        socket.emit("changeDotPos", [4, gameId, moves[0], moves[1]]);
        moves = getBestMoveForPlayer("pink", gameSpot);
        socket.emit("changeDotPos", [5, gameId, moves[0], moves[1]]);
        moves = getBestMoveForPlayer("brown", gameSpot);
        socket.emit("changeDotPos", [6, gameId, moves[0], moves[1]]);
        moves = getBestMoveForPlayer("orange", gameSpot);
        socket.emit("changeDotPos", [7, gameId, moves[0], moves[1]]);
      }

      if (gamePlayer.length === 3) {
        moves = getBestMoveForPlayer("pink", gameSpot);
        socket.emit("changeDotPos", [5, gameId, moves[0], moves[1]]);
        moves = getBestMoveForPlayer("brown", gameSpot);
        socket.emit("changeDotPos", [6, gameId, moves[0], moves[1]]);
        moves = getBestMoveForPlayer("orange", gameSpot);
        socket.emit("changeDotPos", [7, gameId, moves[0], moves[1]]);
      }

      if (gamePlayer.length === 4) {
        moves = getBestMoveForPlayer("brown", gameSpot);
        socket.emit("changeDotPos", [6, gameId, moves[0], moves[1]]);
        moves = getBestMoveForPlayer("orange", gameSpot);
        socket.emit("changeDotPos", [7, gameId, moves[0], moves[1]]);
      }

      if (gamePlayer.length === 5) {
        moves = getBestMoveForPlayer("orange", gameSpot);
        socket.emit("changeDotPos", [7, gameId, moves[0], moves[1]]);
      }
      setPlayerList(gamePlayer)
    });

    socket.on(
      "sendDotGame",
      (game) =>
        game
          ? (setGameSpot(game), console.log("game trouvé"))
          : setGameSpot(spots),
      console.log("empty")
    );
  }

  // let lastSelected;
  socket = io("ws://127.0.0.1:3000/");

  React.useEffect(() => {
    console.log("init socket");
    socket.on("connect", () => {
      console.log("Connected to ws");
      socket.emit("authenticate", jwt);
    });

    socket.emit("getGame", gameId);
    socket.on("sendGame", (game) => {
      console.log("game");
      console.log(game.player);
      const gamePlayer = game.player;

      if (gamePlayer.length === 1)
        socket.emit("setPlayerCoord", [playerId, redDot, gameId]);

      if (gamePlayer.length === 2)
        socket.emit("setPlayerCoord", [playerId, greenDot, gameId]);

      if (gamePlayer.length === 3)
        socket.emit("setPlayerCoord", [playerId, blueDot, gameId]);

      if (gamePlayer.length === 4)
        socket.emit("setPlayerCoord", [playerId, pinkDot, gameId]);

      if (gamePlayer.length === 5)
        socket.emit("setPlayerCoord", [playerId, brownDot, gameId]);

      if (gamePlayer.length === 6)
        socket.emit("setPlayerCoord", [playerId, orangeDot, gameId]);
    });

    socket.emit("getDotGame", gameId);
    socket.on("sendDotGame", (game) => {
      setGameSpot(game);
    });
  }, []);

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
            {playerList.map((e: any) => {
              return (
              <Box className={classes.playerCells}>
                <Typography>{e.username}</Typography>

                <Box className={classes.playerCellsFlexBox}>
                  <Typography>Color </Typography>
                  <Box
                    className={classes.playerCellsBox}
                    style={{ backgroundColor: e.color }}
                  ></Box>
                </Box>
              </Box>
            )})}
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            const actualLocation = window.location.href.slice(
              0,
              window.location.href.length - 4
            );
            enqueueSnackbar("Copied to clipboard", {
              variant: "success",
            });
            navigator.clipboard.writeText(
              `${actualLocation}login?gameId=${gameId}`
            );
          }}
        >
          Share the game
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            socket.emit("getGame", gameId);
            socket.on("sendGame", (game) => {
              const gamePlayer = game.player;
              if (gamePlayer.length === 1) {
                socket.emit("setPlayerCoord", [playerId, redDot, gameId]);
                socket.emit("setPlayerCoord", [3, greenDot, gameId]);
                socket.emit("setPlayerCoord", [4, blueDot, gameId]);
                socket.emit("setPlayerCoord", [5, pinkDot, gameId]);
                socket.emit("setPlayerCoord", [6, brownDot, gameId]);
                socket.emit("setPlayerCoord", [7, orangeDot, gameId]);
              }

              if (gamePlayer.length === 2) {
                socket.emit("setPlayerCoord", [playerId, redDot, gameId]);
                socket.emit("setPlayerCoord", [4, blueDot, gameId]);
                socket.emit("setPlayerCoord", [5, pinkDot, gameId]);
                socket.emit("setPlayerCoord", [6, brownDot, gameId]);
                socket.emit("setPlayerCoord", [7, orangeDot, gameId]);
              }

              if (gamePlayer.length === 3) {
                socket.emit("setPlayerCoord", [playerId, redDot, gameId]);
                socket.emit("setPlayerCoord", [5, pinkDot, gameId]);
                socket.emit("setPlayerCoord", [6, brownDot, gameId]);
                socket.emit("setPlayerCoord", [7, orangeDot, gameId]);
              }

              if (gamePlayer.length === 4) {
                socket.emit("setPlayerCoord", [playerId, redDot, gameId]);
                socket.emit("setPlayerCoord", [6, brownDot, gameId]);
                socket.emit("setPlayerCoord", [7, orangeDot, gameId]);
              }

              if (gamePlayer.length === 5) {
                socket.emit("setPlayerCoord", [playerId, redDot, gameId]);
                socket.emit("setPlayerCoord", [7, orangeDot, gameId]);
              }
            });
          }}
        >
          Launch the game
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            updateGame();
          }}
        >
          Update
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
            {gameSpot.map((points, index) => {
              return (
                // eslint-disable-next-line
                <a
                  onClick={() => {
                    console.log(points);
                    if (points.isMovableHere) {
                      console.log(lastSelected);
                      console.log("send changeDotPos");
                      socket.emit("changeDotPos", [
                        playerId,
                        gameId,
                        lastSelected,
                        points,
                      ]);
                    } else if (points.color !== "lightgrey") {
                      const res = getAllowMoveForDot(points, gameSpot);

                      let tmp = gameSpot;

                      res.forEach((e) => {
                        tmp.forEach((t) => {
                          if (t.x === e.x && t.y === e.y) {
                            console.log("change");
                            t.color = "black";
                            t.isMovableHere = true;
                          }
                        });
                      });
                      setGameSpot(tmp);
                      setReload(Math.floor(Math.random() * 100000));
                      setLastSelected(points);
                      console.log("last selected = ", lastSelected);
                    }
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
