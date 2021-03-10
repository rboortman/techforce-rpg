import React, { useEffect, useState } from 'react';
import { Box, ThemeProvider } from '@material-ui/core';

// App core
import theme from './common/theme';
import { register, joinGame, shutdown, getGameSettings, subscribeToDeath, subscribeToGameSettings } from './api/game';

// Components
import Board from './components/Board';
import AppBar from './components/AppBar';
import Controls from './components/Controls';
import PlayerInfo from './components/PlayerInfo';
import { GameSettings } from './types/core';

// Top level: App Component
export default function App() {
  
  // Top level: State
  const [localPlayerId, setLocalPlayerId] = useState<string>('');
  const [gameSettings, setGameSettings] = useState<GameSettings | undefined>();

  // Initialize top level state
  // Register player + fetch game settings
  useEffect(() => {
    
    async function initialize() {
      const player = await register();
      setLocalPlayerId(player.id);
      const gameSettings = await getGameSettings()
      setGameSettings(gameSettings);

      // Respawn when local player died
      subscribeToDeath((playerId) => {
        if (playerId === player.id) {
          joinGame(player.id);
        }
      })

      subscribeToGameSettings(settings => {
        console.log('settings changed');
        console.log(settings)
        setGameSettings(settings);
      });
    }
    initialize();

    // Shutdown socket connection when closing game
    return function () {
      shutdown();
    };
  }, []);

  // When player Id changes, join game with that Id
useEffect(() => {
    joinGame(localPlayerId);
  }, [gameSettings]);

  if (!localPlayerId) {
    return <div>Registering...</div>
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className="root">
        <Box className="top">
          <AppBar localPlayerId={localPlayerId} />
        </Box>
        <Box display="flex" className="center" m={1}>
          {gameSettings && // Render board when Game Settings are loaded
            <Board localPlayerId={localPlayerId} gameSettings={gameSettings} />
          }
        </Box>
        <Box className="bottom">
          <Controls localPlayerId={localPlayerId} />
          <PlayerInfo />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
