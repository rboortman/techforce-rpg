import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import UserDialog from './UserDialog';
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
  player?: Player;
}

export default function AppBarComponent({ player }: AppBarProps) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          TECHFORCE RPG
        </Typography>
        {player && player ? <UserDialog player={player} /> : null}
      </Toolbar>
    </AppBar>
  );
}
