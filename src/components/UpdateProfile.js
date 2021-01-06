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

const UpdateProfile = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Paper className={classes.root}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Update Profile</h2>
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
            defaultValue={currentUser.email}
          />
          <TextField
            fullWidth
            margin="dense"
            id="password"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            autoComplete="off"
            inputRef={passwordRef}
            placeholder="leave blank to keep the same"
          />
          <TextField
            fullWidth
            margin="dense"
            id="confirm_password"
            name="confirm_password"
            type="password"
            label="Confirm Password"
            variant="outlined"
            autoComplete="off"
            inputRef={passwordConfirmRef}
            placeholder="leave black to keep the same"
          />
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={classes.marginTop}
            disabled={loading}
          >
            Update
          </Button>
          <div className={classes.marginTop}>
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </Paper>
    </>
  );
};

export default UpdateProfile;
