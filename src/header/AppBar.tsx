import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import firebase from 'firebase/app';

import UserDialog from './UserDialog';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import { Player } from '../common/interfaces';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

interface AppBarProps {
  user?: firebase.User;
  player?: Player;
}

const AppBarComponent = ({ user, player }: AppBarProps) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          TECHFORCE RPG
        </Typography>
        {user && player ? <UserDialog user={user} player={player} /> : null}
        {user && <LogoutButton />}
        {!user && <LoginButton />}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
