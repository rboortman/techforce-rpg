import React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import { tileSize } from '../common/generalVariables';
import { PlayerDataStore, TileConfig } from '../common/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: 'solid 1px black',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      width: tileSize,
      height: tileSize,
      overflow: 'hidden',
      boxSizing: 'border-box'
    }
  })
);

interface TileProps {
  tileConfig: TileConfig;
  playerData: PlayerDataStore;
}

export default function Tile({ tileConfig, playerData }: TileProps) {
  const classes = useStyles();
  let backgroundColor: string = grey[50];
  if (tileConfig.obstacle) backgroundColor = grey[700];
  if (tileConfig.userId) backgroundColor = playerData[tileConfig.userId]?.color;

  return (
    <Box className={classes.root} bgcolor={backgroundColor}>
      {tileConfig.attacks.length ? 'F' : ''}
    </Box>
  );
}
