import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import firebase from "firebase/app";

import { LoginButton, LogoutButton } from "./firebase";

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

const AppBar = ({ user }: AppBarProps) => {
  const classes = useStyles();

  return (
    <MuiAppBar.default position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          TECHFORCE RPG
        </Typography>
        {user && <LogoutButton />}
        {!user && <LoginButton />}
      </Toolbar>
    </MuiAppBar.default>
  );
};

export default AppBar;
