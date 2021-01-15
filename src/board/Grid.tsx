import React from "react";
import { Box } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import Tile from "./Tile";
import { gridSize, tileSize } from "../common/generalVariables";
import { BoardInterface } from "../common/interfaces";

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
  board: BoardInterface;
}

function Grid({ board }: GridProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {board.rows.map((row, i) =>
        row.cells.map(({ userId }, j) => (
          <Tile key={`${i},${j}`} userId={userId} />
        ))
      )}
    </Box>
  );
}

export default Grid;
