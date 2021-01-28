import React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import Tile from './Tile';
import { gridSize, tileSize } from '../common/generalVariables';
import { BoardInterface, PlayerDataStore } from '../common/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      border: "solid 1px black",
      borderBottomWidth: 0,
      borderRightWidth: 0,
      gridTemplateColumns: `repeat(${gridSize}, ${tileSize}px)`,
      gridTemplateRows: `repeat(${gridSize}, ${tileSize}px)`,
      overflow: 'hidden',
      margin: 'auto'
    }
  })
);

interface GridProps {
  board: BoardInterface;
  playerData: PlayerDataStore;
}

function Grid({ board, playerData }: GridProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {board.rows.map((row, i) => row.cells.map(({ userId }, j) => <Tile key={`${i},${j}`} userId={userId} playerData={playerData} />))}
    </Box>
  );
}

export default Grid;
