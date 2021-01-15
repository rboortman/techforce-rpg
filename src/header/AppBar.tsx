import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import firebase from "firebase/app";

import { LoginButton, LogoutButton } from "../api/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface AppBarProps {
  user: firebase.User | null;
}

const AppBarComponent = ({ user }: AppBarProps) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          TECHFORCE RPG
        </Typography>
        {user && <LogoutButton />}
        {!user && <LoginButton />}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
