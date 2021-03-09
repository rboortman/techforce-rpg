import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import { TILE_SIZE } from '../common/constants';
import { getTile, subscribeToTile } from '../api/game';
import { BoardCoordinate, TileConfig } from '../types/core';

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
  boardCoordinate: BoardCoordinate;
  localPlayerId: string;
}

export default function BoardTile({ boardCoordinate, localPlayerId }: BoardTileProps) {

  const [tileConfig, setTileConfig] = useState<TileConfig>({
    obstacle: null, 
    playerId: '', 
    playerColor: '',
    attackedBy: '',
    attackingUntil: null,
    damage: 0,
  })

  useEffect(() => {
    // Retrieve initial tile data
    const initialize = async () => {
      const initialTileData = await getTile(boardCoordinate);
      setTileConfig(initialTileData);
    }
    initialize();

    // Subscribe to tile data
    subscribeToTile(boardCoordinate, setTileConfig)
  }, [boardCoordinate]);

  const classes = useStyles();

  let backgroundColor: string = grey[50];
  if (tileConfig.playerColor) backgroundColor = tileConfig.playerColor;
  if (tileConfig.obstacle) backgroundColor = grey[700];

  let content = '';
  if (tileConfig.playerId) content = '🧙';
  if (tileConfig.playerId === localPlayerId) content = '👑';

  if (tileConfig.attackingUntil) content = '🔥';

  return (
    <Box className={classes.root}>
      <Box className={classes.content} bgcolor={backgroundColor}>
        {content}
      </Box>
    </Box>
  );
}
