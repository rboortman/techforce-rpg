import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { Player } from '../types/client';
import { MoveDirection } from '../types/core';

const useStyles = makeStyles(theme => ({
  controls: {
    display: 'flex',
    justifyContent: 'center'
  },
  outer_col: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  middle_col: {
    display: 'flex',
    flexDirection: 'column'
  },
  left_row: {
    display: 'flex'
  },
  right_row: {
    display: 'flex'
  }
}));

interface ControlsProps {
  player?: Player;
  move: (direction: MoveDirection) => void;
}

export default function Controls({ player, move }: ControlsProps) {
  const classes = useStyles();

  function onClickMove(direction: MoveDirection) {
    // TODO: Implement moving the charactar
  }

  return (
    <Box className={classes.controls}>
      <Box className={classes.outer_col}>
        <Box className={classes.left_row}>
          <IconButton edge="start" color="primary" aria-label="menu" onClick={() => onClickMove(MoveDirection.LEFT)}>
            <KeyboardArrowLeft />
          </IconButton>
        </Box>
      </Box>
      <Box className={classes.middle_col}>
        <IconButton edge="start" color="primary" aria-label="menu" onClick={() => onClickMove(MoveDirection.UP)}>
          <KeyboardArrowUp />
        </IconButton>
        <IconButton edge="start" color="primary" aria-label="menu" onClick={() => onClickMove(MoveDirection.DOWN)}>
          <KeyboardArrowDown />
        </IconButton>
      </Box>
      <Box className={classes.outer_col}>
        <Box className={classes.right_row}>
          <IconButton edge="start" color="primary" aria-label="menu" onClick={() => onClickMove(MoveDirection.RIGHT)}>
            <KeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
