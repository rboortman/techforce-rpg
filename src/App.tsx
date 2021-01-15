import React, { useEffect, useState } from "react";
import { Button, ThemeProvider } from "@material-ui/core";

import firebase from "firebase/app";
import "firebase/auth";

import theme from "./theme";
import "./firebase";

import "./App.css";
import Grid from "./Grid";
import AppBar from "./AppBar";
import Controls from "./Controls";

function App() {
  const [user, setUser] = useState<null | firebase.User>(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <div className="top">
          <AppBar user={user} />
        </div>
        <div className="center">
          The grid:
          <Grid />
        </div>
        <div className="bottom">
          <Controls />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
