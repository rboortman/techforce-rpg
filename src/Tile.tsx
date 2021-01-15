import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "solid 1px black",
      background: "red",
      width: 25,
      height: 25,
      overflow: "hidden",
    },
  })
);

function Tile() {
  const classes = useStyles();

  return <div className={classes.root} />;
}

export default Tile;
