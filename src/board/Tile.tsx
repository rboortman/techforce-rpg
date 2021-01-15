import React from "react";
import { Box } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import { tileSize } from "../common/generalVariables";
import { PlayerData } from "../common/interfaces";

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
  playerData: PlayerData;
}

function Tile({ userId, playerData }: TileProps) {
  const classes = useStyles();

  return <Box className={classes.root} bgcolor={userId ? playerData[userId].color : "white"} />;
}

export default Tile;