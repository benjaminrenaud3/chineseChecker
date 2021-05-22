import React from "react";
import {
  Box,
  makeStyles,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

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

const prepareGame = async (history: any) => {
  const data = { gameId: "12" };
  localStorage.setItem("game", data.gameId);

  history.push("/game");
};

const joinGame = async (history: any, gameid: string) => {

    // const data = { gameId: "12" };
    localStorage.setItem("game", gameid);
  
    history.push("/game");
}

const CreateOrJoin = () => {
  const [step, setStep] = React.useState<0 | 1>(0);
  const [gameInput, setGameInput] = React.useState<string>("");
  const classes = useStyles();
  const history = useHistory();

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
                  prepareGame(history);
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
                    joinGame(history, gameInput)
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
