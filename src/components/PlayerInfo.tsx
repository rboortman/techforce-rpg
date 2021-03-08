import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

// Hooks
import { usePlayerDataStore } from '../hooks/usePlayerDataStore';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

export default function PlayerInfo() {
  const classes = useStyles();
  const playerDataStore = usePlayerDataStore();

  return (
    <Box className={classes.root}>
      {Object.values(playerDataStore).map(player => {
        return (
          <div key={player.id}>
            {player.name || player.id}: {player.health} ({player.kills}/{player.deaths})
          </div>
        );
      })}
    </Box>
  );
}
