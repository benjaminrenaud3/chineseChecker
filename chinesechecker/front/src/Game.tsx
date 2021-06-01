import React from "react";
import Circle from "./Circle";
import { useHistory, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { coordDto } from "./login/interface";
import { getAllowMoveForDot } from "./algo/AlgoMove";
import { getBestMoveForPlayer } from "./algo/AlgoIA";
import { makeStyles, Box, Grid, Typography, Button } from "@material-ui/core";
import io from "socket.io-client";
import { RepeatRounded } from "@material-ui/icons";
import { outier, redDot, playerList, spots, Dot } from "./gameConst";
import { useInterval } from "./Hooks/SetInterval";

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
  const location = useLocation();

  const gameId = localStorage.getItem("game");
  const jwt = localStorage.getItem("jwt");
  const playerId = localStorage.getItem("playerId");
  let socket: any;
  const [gameSpot, setGameSpot] = React.useState<Dot[]>(spots);
  const [reload, setReload] = React.useState<any>(false);
  const [lastSelected, setLastSelected] = React.useState<Dot>();



  function updateGame() {
    socket.emit("getDotGame", gameId);
    socket.on("sendDotGame", (game) => game ? (setGameSpot(game), console.log("game trouvé")) : setGameSpot(spots), console.log("empty"));
  }

  // let lastSelected;
  socket = io("ws://127.0.0.1:3000/");

  React.useEffect(() => {
    console.log("init socket");
    socket.on("connect", () => {
      console.log("Connected to ws");
      socket.emit("authenticate", jwt);
    });

    socket.emit("setPlayerCoord", [playerId, redDot, gameId]);

    // socket.emit("getGame", gameId);
    // socket.on("sendGame", (game) => console.log(game));

    socket.emit("getDotGame", gameId);
    socket.on("sendDotGame", (game) => game ? (setGameSpot(game), console.log("game trouvé")) : setGameSpot(spots), console.log("empty"));

    
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


  //   getGame (gameId) : toute les info players
  // getDotGame (gameId) : tout les dots
  // setPlayerCoord ([playerId, redDot, gameId])
  // changeDotPos ([playerId, gameId, dotStart, dotEnd])
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
        >
          Launch the game
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            updateGame()
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

                        // socket.emit("getDotGame");
                        // socket.on("sendDotGame", (game) => game ? setGameSpot(game) : setGameSpot(spots));
                    } else if (points.color != "lightgrey") {
                      const res = getAllowMoveForDot(points, gameSpot);

                      let tmp = gameSpot;

                      res.forEach((e) => {
                        tmp.forEach((t) => {
                          if (t.x === e.x && t.y === e.y) {
                            console.log("change");
                            t.color = "black";
                            t.isMovableHere = true;
                          } ;
                        });
                      });
                      setGameSpot(tmp);
                      setReload(Math.floor(Math.random() * 100000));
                      setLastSelected(points);
                      console.log("last selected = ", lastSelected)
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
