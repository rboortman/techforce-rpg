import React, { useEffect, useReducer, useState } from "react";
import { Box, ThemeProvider } from "@material-ui/core";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import theme from "./common/theme";

import "./api/firebase";
import * as api from "./api/board";

import Grid from "./board/Grid";
import AppBar from "./header/AppBar";
import Controls from "./board/Controls";
import { ActionInterface, BoardInterface } from "./common/interfaces";

const initialState: BoardInterface = { rows: [{ cells: [] }] };

function reducer(state: BoardInterface, action: ActionInterface) {
  switch (action.type) {
    case "update":
      return action.payload.board;

    default:
      return state;
  }
}

function App() {
  const [user, setUser] = useState<null | firebase.User>(null);
  const [board, boardDispatcher] = useReducer(reducer, initialState);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await firebase
        .firestore()
        .collection("players")
        .get();
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
      });
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    api.registerBoardUpdateListener((board) => {
      boardDispatcher({
        type: "update",
        payload: { board },
      });
    });
  }, []);

  useEffect(() => {}, [board, user]);

  useEffect(() => {
    // boardDispatcher({
    //   type: "init",
    //   payload: { userId: user ? user.uid : "" },
    // });
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Box className="root">
        <Box className="top">
          <AppBar user={user} />
        </Box>
        <Box display="flex" className="center" m={1}>
          <Grid board={board} />
        </Box>
        <Box className="bottom">
          {user && <Controls board={board} user={user} />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
