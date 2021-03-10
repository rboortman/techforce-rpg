import React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { TILE_SIZE } from '../common/constants';

import { BoardInterface } from '../types/core';
import { Player } from '../types/client';
import BoardTile from './BoardTile';

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
  board: BoardInterface;
  player: Player;
}

export default function Board({ board, player }: BoardProps) {
  const classes = useStyles();
  const gridSize = board.rows.length;

  return (
    <Box className={classes.root} gridTemplateColumns={`repeat(${gridSize}, ${TILE_SIZE}px)`} gridTemplateRows={`repeat(${gridSize}, ${TILE_SIZE}px)`}>
      {board.rows.map((row, i) => {
        return row.cells.map((tileConfig, j) => {
          return <BoardTile key={`${i},${j}`} tileConfig={tileConfig} player={player} />;
        });
      })}
    </Box>
  );

}
