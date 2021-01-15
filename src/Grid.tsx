import React, { useReducer, useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import Tile from "./Tile";

const gridSize = 10;
const tileSize = 25;

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

interface TileConfig {}
interface ActionInterace {
  type: "init";
}
type BoardType = (TileConfig | undefined)[][];

const initialState: BoardType = [[]];

function reducer(state: BoardType, action: ActionInterace) {
  switch (action.type) {
    case "init":
      let newState: BoardType = [];
      for (let i = 0; i < gridSize; i++) {
        newState[i] = [];
        for (let j = 0; j < gridSize; j++) {
          newState[i][j] = {};
        }
      }
      return newState;

    default:
      return state;
  }
}

function Grid() {
  const [board, boardDispatcher] = useReducer(reducer, initialState);
  const classes = useStyles();

  useEffect(() => {
    boardDispatcher({ type: "init" });
  }, []);

  return (
    <div className={classes.root}>
      {board.map((row) => row.map(() => <Tile />))}
    </div>
  );
}

export default Grid;
