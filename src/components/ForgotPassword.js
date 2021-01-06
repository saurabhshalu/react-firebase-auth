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

const ForgotPassword = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const { currentUser, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  if (currentUser) {
    history.replace("/");
  }

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <Paper className={classes.root}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Password Reset</h2>
        {error && (
          <Alert style={{ marginBottom: 10 }} severity="error">
            {error}
          </Alert>
        )}
        {message && (
          <Alert style={{ marginBottom: 10 }} severity="success">
            {message}
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
        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          className={classes.marginTop}
          disabled={loading}
        >
          Reset Password
        </Button>
        <div className={classes.marginTop}>
          <Link to="/login">Login</Link>
        </div>
        <div className={classes.marginTop}>
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </Paper>
  );
};

export default ForgotPassword;
