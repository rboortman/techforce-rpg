import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AppBarDialog from './AppBarDialog';
import { PartialPlayer, Player } from '../types/client';

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
  updatePlayer: (player: PartialPlayer) => void;
}


export default function AppBarComponent({ player, updatePlayer }: AppBarProps) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          TECHFORCE RPG
        </Typography>
        {player && player ? <AppBarDialog player={player} updatePlayer={updatePlayer} /> : null}
      </Toolbar>
    </AppBar>
  );

}
