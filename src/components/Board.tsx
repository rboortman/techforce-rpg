import React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { TILE_SIZE } from '../common/constants';

import BoardTile from './BoardTile';
import { GameSettings } from '../types/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'grid',
      border: 'solid 1px black',
      borderBottomWidth: 0,
      borderRightWidth: 0,
      overflow: 'hidden',
      margin: 'auto'
    }
  })
);

interface BoardProps {
  gameSettings: GameSettings;
  localPlayerId: string;
}

export default function Board({ gameSettings, localPlayerId }: BoardProps) {
  const classes = useStyles();
  const { gridSize } = gameSettings;

  // Make a Tile for each cell
  const rows = [...new Array(gridSize)].map((row, y) => (
    [...new Array(gridSize)].map((column, x) => (
      <BoardTile localPlayerId={localPlayerId} key={`${y},${x}`} boardCoordinate={{x, y}} />
    ))
  ))

  return (
    <Box className={classes.root} gridTemplateColumns={`repeat(${gridSize}, ${TILE_SIZE}px)`} gridTemplateRows={`repeat(${gridSize}, ${TILE_SIZE}px)`}>
      {rows}
    </Box>
  );
}
