import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { PlayerDataStore } from '../common/interfaces';

const useStyles = makeStyles(theme => ({
  
}));

interface PlayerInfoProps {
  playerStore: PlayerDataStore;
}

export default function PlayerInfo({ playerStore }: PlayerInfoProps) {
  const classes = useStyles();

  return (
    <Box>
      {Object.values(playerStore).map(player => {
        return (
          <div>{player.name || player.id}: {player.health}</div>
        )
      })}
    </Box>
  );
}
