import React, { useEffect, useState } from 'react';
import { Box, ThemeProvider } from '@material-ui/core';

// App core
import theme from './common/theme';
import { BoardInterface, GameSettings, Player, PlayerDataStore } from './common/interfaces';
import { register, joinGame, subscribeToBoard, subscribeToPlayers, shutdown, getGameSettings } from './api/game';

// Components
import Board from './board/Board';
import AppBar from './header/AppBar';
import Controls from './board/Controls';
import PlayerInfo from './board/PlayerInfo';

const initialState: BoardInterface = { rows: [{ cells: [] }] };

export default function App() {
  const [playerId, setPlayerId] = useState<string>('');
  const [gameSettings, setGameSettings] = useState<GameSettings | undefined>();
  const [playerDataStore, setPlayerDataStore] = useState<PlayerDataStore>({});

  console.log(playerDataStore)

  const player: Player | undefined = playerDataStore && playerDataStore[playerId];

  useEffect(() => {
    
    // Async initializer function
    async function initialize() {

      // Register player
      const player = await register();
      setPlayerId(player.id);

      // Get game settings
      const gameSettings = await getGameSettings()
      setGameSettings(gameSettings);

      subscribeToPlayers(players => {
        setPlayerDataStore(players);
      });
    }

    // Call initializer
    initialize();

    // Shutdown socket connection when closing game
    return function () {
      shutdown();
    };
  }, []);

  useEffect(() => {
    joinGame(playerId);
  }, [playerId]);

  return (
    <ThemeProvider theme={theme}>
      <Box className="root">
        <Box className="top">
          <AppBar player={player} />
        </Box>
        <Box display="flex" className="center" m={1}>
          {gameSettings && 
            <Board playerData={playerDataStore} gameSettings={gameSettings} />
          }
        </Box>
        <Box className="bottom">
          {player && <Controls player={player} />}
          <PlayerInfo playerStore={playerDataStore} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
