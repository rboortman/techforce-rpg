import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { MoveDirection } from "../common/interfaces";

const useStyles = makeStyles((theme) => ({
  controls: {
    display: "flex",
    justifyContent: "center",
  },
  outer_col: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  middle_col: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
  },
}));

interface ControlsProps {
  onMove: (direction: MoveDirection) => void;
}

const Controls = ({ onMove }: ControlsProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.controls}>
      <Box className={classes.outer_col}>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={() => onMove(MoveDirection.LEFT)}
        >
          <KeyboardArrowLeft />
        </IconButton>
      </Box>
      <Box className={classes.middle_col}>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={() => onMove(MoveDirection.UP)}
        >
          <KeyboardArrowUp />
        </IconButton>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={() => onMove(MoveDirection.DOWN)}
        >
          <KeyboardArrowDown />
        </IconButton>
      </Box>
      <Box className={classes.outer_col}>
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={() => onMove(MoveDirection.RIGHT)}
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Controls;
