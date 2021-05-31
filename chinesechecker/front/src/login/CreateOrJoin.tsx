import React from "react";
import {
  Box,
  makeStyles,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Game } from "./interface";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  buttonBox: {
    width: 100,
  },
  input: {
    marginBottom: theme.spacing(1),
  },
}));

const prepareGame = async (history: any, enqueueSnackbar: Function) => {
  const playerId = localStorage.getItem("playerId");
  const jwt = localStorage.getItem("jwt");

  const res = await fetch(`http://localhost:3000/game`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      playerId: [playerId],
    }),
  });

  if (res.status !== 201) {
    const error = await res.json();
    enqueueSnackbar(error.message, {
      variant: "error",
    });
    return;
  }
  const data: Game = await res.json();

  localStorage.setItem("game", String(data.id));

  history.push("/game");
};

const joinGame = async (
  history: any,
  gameid: string,
  enqueueSnackbar: Function
) => {
  localStorage.setItem("game", gameid);

  const playerId = localStorage.getItem("playerId");
  const jwt = localStorage.getItem("jwt");

  const res = await fetch(
    `http://localhost:3000/game/join/${gameid}/${playerId}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }
  );

  if (res.status !== 200) {
    const error = await res.json();
    enqueueSnackbar(error.message, {
      variant: "error",
    });
    return;
  }

  const data: Game = await res.json();

  localStorage.setItem("game", String(data.id));

  history.push("/game");
};

const CreateOrJoin = () => {
  const [step, setStep] = React.useState<0 | 1>(0);
  const [gameInput, setGameInput] = React.useState<string>("");
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  const searchTearms = location.search.split("=");

  console.log(searchTearms);
  if (searchTearms && searchTearms[0] === "?gameId" && searchTearms[1]) {
    joinGame(history, searchTearms[1], enqueueSnackbar);
    return null;
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        {step === 0 && (
          <Box className={classes.buttonContainer}>
            <Box className={classes.buttonBox}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  prepareGame(history, enqueueSnackbar);
                }}
              >
                Create
              </Button>
            </Box>
            <Box className={classes.buttonBox}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  setStep(1);
                }}
              >
                Join
              </Button>
            </Box>
          </Box>
        )}

        {step === 1 && (
          <Box>
            <TextField
              className={classes.input}
              fullWidth
              label="Game id"
              name="game"
              onChange={(e) => {
                setGameInput(e.target.value);
              }}
              required
              value={gameInput}
              variant="outlined"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                joinGame(history, gameInput, enqueueSnackbar);
              }}
            >
              Join
            </Button>
          </Box>
        )}
      </div>
    </Container>
  );
};

export default CreateOrJoin;
