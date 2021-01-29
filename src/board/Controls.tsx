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

import { BoardInterface, MoveDirection, Player } from '../common/interfaces';
import { moveUser, resetBoard } from '../api/board';
import { attack } from '../api/player';

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
  player?: Player;
}

const Controls = ({ board, user }: ControlsProps) => {
  const classes = useStyles();

  const onClickResetBoard = () => {
    resetBoard();
  };

  const onClickMove = (direction: MoveDirection) => {
    moveUser(direction);
  };

  const dealDamage = () => {
    console.log('Attacking!');
    attack();
  };

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
          <Button onClick={onClickResetBoard}>Reset board</Button>
          <Button onClick={dealDamage}>Attack!</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Controls;
