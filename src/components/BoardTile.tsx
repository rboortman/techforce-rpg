import React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import { TILE_SIZE } from '../common/constants';
import { TileConfig } from '../types/core';
import { Player } from '../types/client';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      border: 'solid 1px black',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      width: TILE_SIZE,
      height: TILE_SIZE,
      overflow: 'hidden',
      boxSizing: 'border-box'
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    }
  })
);

interface BoardTileProps {
  tileConfig: TileConfig;
  player: Player;
}

export default function BoardTile({ tileConfig, player }: BoardTileProps) {
  const classes = useStyles();

  let backgroundColor: string = grey[50];
  if (tileConfig.playerId === player.id) backgroundColor = player.color;
  if (tileConfig.obstacle) backgroundColor = grey[700];

  let content = '';
  if (tileConfig.playerId) content = '🧙';

  return (
    <Box className={classes.root}>
      <Box className={classes.content} bgcolor={backgroundColor}>
        {content}
      </Box>
    </Box>
  );
}
