import React, { useEffect, useReducer, useState } from "react";
import { Box, ThemeProvider } from "@material-ui/core";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import theme from "./common/theme";

import "./App.css";
import Grid from "./board/Grid";
import AppBar from "./header/AppBar";
import Controls from "./board/Controls";
import { gridSize } from "./common/generalVariables";
import {
  BoardType,
  BoardCoordinate,
  ActionInterface,
  MoveDirection,
} from "./common/interfaces";

const initialState: BoardType = [[]];
const initialPosition: BoardCoordinate = { x: 0, y: 0 };

function findUser(board: BoardType) {
  let position: BoardCoordinate | undefined;
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell?.user) position = { x: j, y: i };
    });
  });
  return position;
}

function reducer(state: BoardType, action: ActionInterface) {
  switch (action.type) {
    case "init":
      let newState: BoardType = [];
      for (let i = 0; i < gridSize; i++) {
        newState[i] = [];
        for (let j = 0; j < gridSize; j++) {
          newState[i][j] = {
            user: i === initialPosition.y && j === initialPosition.x,
          };
        }
      }
      return newState;

    case "move":
      const position = findUser(state);
      if (position) {
        let newPosition = { ...position };
        switch (action.payload.direction) {
          case MoveDirection.UP:
            newPosition.y--;
            break;

          case MoveDirection.DOWN:
            newPosition.y++;
            break;

          case MoveDirection.LEFT:
            newPosition.x--;
            break;

          case MoveDirection.RIGHT:
            newPosition.x++;
            break;
        }
        if (
          newPosition.x < 0 ||
          newPosition.x >= gridSize ||
          newPosition.y < 0 ||
          newPosition.y >= gridSize
        ) {
          newPosition = { ...position };
        }
        return state.map((row, i) =>
          row.map((cell, j) => ({
            user: i === newPosition.y && j === newPosition.x,
          }))
        );
      }
      return state;

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
        .collection("users")
        .get();
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
      });
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    boardDispatcher({ type: "init" });
  }, []);

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
          <Controls
            onMove={(direction) => {
              boardDispatcher({ type: "move", payload: { direction } });
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
