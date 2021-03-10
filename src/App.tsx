import React, { useState } from 'react';
import { Box, ThemeProvider } from '@material-ui/core';

// App core
import theme from './common/theme';

// Components
import Board from './components/Board';
import AppBar from './components/AppBar';
import Controls from './components/Controls';
import { BoardInterface, MoveDirection } from './types/core';
import { INITIAL_BOARD } from './common/constants';
import { PartialPlayer, Player } from './types/client';

// Top level: App Component
export default function App() {
  
  // Top level: State
  const [player, setPlayer] = useState<Player>({
    id: '42',
    name: 'super-bozz72',
    color: '#2196f3'
  });
  const [board, setBoard] = useState<BoardInterface>(INITIAL_BOARD);

  function movePlayer(direction: MoveDirection) {
    let position = { x: 0, y: 0 };
    board.rows.forEach((row, y) => {
      row.cells.forEach((cell, x) => {
        if (cell.playerId === player.id) position = { x, y };
      });
    });

    switch (direction) {
      case MoveDirection.UP:
        position.y--;
        break;

      case MoveDirection.DOWN:
        position.y++;
        break;

      case MoveDirection.LEFT:
        position.x--;
        break;

      case MoveDirection.RIGHT:
        position.x++;
        break;
    }

    console.log(position)

    // TODO: Validate if the new spot is actually a valid location

    const newBoard = {
      rows: board.rows.map((row, i) => ({
        cells: row.cells.map((cell, j) => {
          return {
            ...cell,
            playerId: i === position.y && j === position.x ? player.id : ''
          };
        })
      }))
    };

    console.log(newBoard);

    setBoard(newBoard);
  }

  function updatePlayer(partialPlayer: PartialPlayer) {
    setPlayer({
      ...player,
      ...partialPlayer
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="root">
        <Box className="top">
          <AppBar player={player} updatePlayer={updatePlayer} />
        </Box>
        <Box display="flex" className="center" m={1}>
          {(
            <Board player={player} board={board}/>
          )}
        </Box>
        <Box className="bottom">
          {player && <Controls player={player} move={movePlayer} />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
