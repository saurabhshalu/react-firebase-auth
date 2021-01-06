import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';


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
const Dashboard = () => {
  const classes = useStyles();

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const  handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Paper className={classes.root}>
      <div>
        <h2>Profile</h2>
        {error && (
          <Alert style={{ marginBottom: 10 }} severity="error">
            {error}
          </Alert>
        )}
        <Typography><strong>Email:</strong> {currentUser.email}</Typography>
        
        <br />
        <Link to="/update-profile">Update Profile</Link>
        <br />
        <Button
          className={classes.marginTop}
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </Paper>
  );
}

export default Dashboard;