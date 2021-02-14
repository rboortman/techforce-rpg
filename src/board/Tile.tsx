import React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

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

  return (
    <Box className={classes.root} bgcolor={tileConfig.userId ? playerData[tileConfig.userId]?.color : 'white'}>
       {tileConfig.attackingUntil ? 'F' : ''}
    </Box>
  );
}
