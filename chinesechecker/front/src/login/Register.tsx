import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import { Box } from "@material-ui/core";

interface Props {
  setStep: Function;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    margin: theme.spacing(1),
  },
  icon: {
    marginBottom: theme.spacing(2),
  },
}));

const Register = ({ setStep }: Props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Box className={classes.icon}>
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
        </Box>
        <Formik
          enableReinitialize
          initialValues={{
            login: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            login: Yup.string().max(255).required("login is required"),
            password: Yup.string().max(255).required("password is required"),
          })}
          onSubmit={async (
            values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              console.log("submit")
              const res = await fetch(`http://localhost:3000/player`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  username: values.login,
                  password: values.password,
                }),
              });
              console.log(res.status)
              if (res.status !== 201) {
                setStatus({ success: false });
                const error = await res.json();
                enqueueSnackbar(error.message, {
                  variant: "error",
                });
                return;
              }

              setStatus({ success: true });
              enqueueSnackbar("Register successed", {
                variant: "success",
              });

              setStep(1);
            } catch (error) {
              setStatus({ success: false });
              setErrors(error.message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <TextField
                  className={classes.input}
                  error={Boolean(touched.login && errors.login)}
                  fullWidth
                  helperText={touched.login && errors.login}
                  label="Login"
                  name="login"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.login}
                  variant="outlined"
                />

                {console.log(errors)}

                <TextField
                  className={classes.input}
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  type="password"
                  value={values.password}
                  variant="outlined"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link onClick={() => setStep(1)} variant="body2">
                      <Typography>Already have an account? Sign in</Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Register;
