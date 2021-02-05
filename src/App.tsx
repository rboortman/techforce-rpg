import React, { useEffect, useState } from 'react';
import { Box, ThemeProvider } from '@material-ui/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

import theme from './common/theme';

import './api/firebase';

import Grid from './board/Grid';
import AppBar from './header/AppBar';
import Controls from './board/Controls';
import { BoardInterface, PlayerDataStore } from './common/interfaces';
import { placeNewPlayerOnBoard, registerBoardUpdateListener } from './api/board';
import { registerPlayerStoreUpdateListener } from './api/player';
import { connect } from 'socket.io-client';
import { joinGame, subscribeToBoard } from './api/game';

const initialState: BoardInterface = { rows: [{ cells: [] }] };

function App() {
  const [user, setUser] = useState<undefined | firebase.User>(undefined);
  const [playerDataStore, setPlayerDataStore] = useState<PlayerDataStore>({});
  const [board, setBoard] = useState<BoardInterface>(initialState);

  const player = user && playerDataStore[user.uid];

  useEffect(() => {
    firebase.auth().onAuthStateChanged(newUser => {
      setUser(newUser || undefined);
    });
  }, []);

  useEffect(() => {
    function isPlayerOnBoard() {
      return board.rows.some(row => row.cells.some(cell => cell.userId === user?.uid));
    }

    // if (user && playerDataStore.hasOwnProperty(user.uid) && !isPlayerOnBoard()) {
    //   placeNewPlayerOnBoard();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, playerDataStore]);

  useEffect(() => {
    registerPlayerStoreUpdateListener(playerDataStore => {
      setPlayerDataStore(playerDataStore);
    });
  }, []);

  useEffect(() => {
    subscribeToBoard(board => {
      setBoard(board);
    });
  }, []);

  useEffect(() => {
    joinGame(user?.uid || '');
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Box className="root">
        <Box className="top">
          <AppBar user={user} player={player} />
        </Box>
        <Box display="flex" className="center" m={1}>
          <Grid playerData={playerDataStore} board={board} />
        </Box>
        <Box className="bottom">{user && <Controls board={board} user={user} player={player} />}</Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
