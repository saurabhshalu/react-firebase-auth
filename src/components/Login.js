import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { TextField, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 400,
      textAlign: "center",
      padding: "20px",
    },
  },
  marginTop: {
    marginTop: 10,
  },
}));

const Login = () => {
  const classes = useStyles();

  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login, signInWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  if (currentUser) {
    history.replace("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  const signInWithGoogleHandler = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div>
      <Paper className={classes.root}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Log In</h2>
          {error && <Alert style={{marginBottom: 10}} severity="error">{error}</Alert>}
          <TextField
            fullWidth
            required
            margin="dense"
            id="email"
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            autoComplete="off"
            inputRef={emailRef}
          />
          <TextField
            fullWidth
            required
            margin="dense"
            id="password"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            autoComplete="off"
            inputRef={passwordRef}
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={classes.marginTop}
            disabled={loading}
            fullWidth
          >
            Login
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            className={classes.marginTop}
            disabled={loading}
            fullWidth
            onClick={signInWithGoogleHandler}
          >
            Sign in with Google
          </Button>
          <div className={classes.marginTop}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className={classes.marginTop}>
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default Login;