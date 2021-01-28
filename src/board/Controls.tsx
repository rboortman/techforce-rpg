import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/auth';
import 'firebase/firestore';

import { BoardInterface, MoveDirection } from '../common/interfaces';
import { moveUser, placeNewPlayerOnBoard, resetBoard } from '../api/board';

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
  board: BoardInterface;
  user: firebase.User;
}

const Controls = ({ board, user }: ControlsProps) => {
  const classes = useStyles();

  const onClickResetBoard = async () => {
    await resetBoard();
  };

  const onClickStart = async () => {
    await placeNewPlayerOnBoard(board, user.uid);
  };

  const onClickMove = (direction: MoveDirection) => {
    // moveUser(board, direction, user.uid);
    const f = firebase.functions();
    const callable = f.httpsCallable('movePlayer');
    callable({direction});
  };

  return (
    <Box className={classes.controls}>
      <Box className={classes.outer_col}>
        <Box className={classes.left_row}>
          <Button onClick={onClickStart}>Start</Button>
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
          <Button onClick={onClickResetBoard}>Reset board</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Controls;
