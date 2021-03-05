import React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { tileSize } from '../common/generalVariables';
import { BoardInterface, GameSettings, PlayerDataStore } from '../common/interfaces';

import Tile from './Tile';

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
  playerData: PlayerDataStore;
}

export default function Board({ gameSettings, playerData }: BoardProps) {
  const classes = useStyles();
  const { gridSize } = gameSettings;

  const rows = [...new Array(gridSize)].map((row, y) => (
    [...new Array(gridSize)].map((column, x) => (
      <Tile key={`${y},${x}`} boardCoordinate={{x, y}} />
    ))
  ))

  return (
    <Box className={classes.root} gridTemplateColumns={`repeat(${gridSize}, ${tileSize}px)`} gridTemplateRows={`repeat(${gridSize}, ${tileSize}px)`}>
      {rows}
    </Box>
  );
}
