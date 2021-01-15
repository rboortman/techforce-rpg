import React from "react";
import { Box } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import Tile from "./Tile";
import { gridSize, tileSize } from "../common/generalVariables";
import { BoardType } from "../common/interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      gridTemplateColumns: `repeat(${gridSize}, ${tileSize}px)`,
      gridTemplateRows: `repeat(${gridSize}, ${tileSize}px)`,
      overflow: "hidden",
      margin: "auto",
    },
  })
);

interface GridProps {
  board: BoardType;
}

function Grid({ board }: GridProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {board.map((row, i) =>
        row.map(({ user }, j) => <Tile key={`${i},${j}`} user={user} />)
      )}
    </Box>
  );
}

export default Grid;
