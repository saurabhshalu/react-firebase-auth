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

const Signup = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  if (currentUser) {
    history.replace("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Paper className={classes.root}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          {error && (
            <Alert style={{ marginBottom: 10 }} severity="error">
              {error}
            </Alert>
          )}
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
          <TextField
            fullWidth
            required
            margin="dense"
            id="confirm_password"
            name="confirm_password"
            type="confirm_password"
            label="Confirm Password"
            variant="outlined"
            autoComplete="off"
            inputRef={passwordConfirmRef}
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={classes.marginTop}
            disabled={loading}
          >
            Sign Up
          </Button>
          <div className={classes.marginTop}>
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </form>
      </Paper>
    </>
  );
};

export default Signup;
