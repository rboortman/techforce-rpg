import React from "react";
import { Box } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import { tileSize } from "../common/generalVariables";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "solid 1px black",
      // background: "red",
      width: tileSize,
      height: tileSize,
      overflow: "hidden",
    },
  })
);

interface TileProps {
  userId?: string;
}

function Tile({ userId }: TileProps) {
  const classes = useStyles();

  return <Box className={classes.root} bgcolor={userId ? "black" : "red"} />;
}

export default Tile;
