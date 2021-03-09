import { connect } from 'socket.io-client';

import { Player, PartialPlayer, PlayerDataStore } from '../types/client';
import { BoardCoordinate, GameSettings, MoveDirection, TileConfig } from '../types/core';

// const moves = [
//   () => move(MoveDirection.RIGHT),
//   () => move(MoveDirection.DOWN),
//   () => move(MoveDirection.LEFT),
//   () => move(MoveDirection.UP),
//   () => attack(),
// ]

// setInterval(() => {
//   const i = Math.floor(Math.random() * 5)
//   moves[i]();
// }, 1000);

// const SERVER_URL = 'https://techforce-rpg-host.zwanenburg.info:8080';
const SERVER_URL = 'http://localhost:8080';

let socket = connect(SERVER_URL);
socket.on('connect', () => {
  console.log('joining game');
});

export function register() {
  return new Promise<Player>((resolve, reject) => {
    try {
      socket.emit('register', (player: Player) => {
        resolve(player);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function joinGame(id: string) {
  socket.emit('join game', id);
}

export function move(direction: MoveDirection) {
  socket.emit('move', direction);
}

export function attack() {
  socket.emit('attack');
}

export function updatePlayer(player: PartialPlayer) {
  socket.emit('update player', player);
}

export function subscribeToPlayers(callback: (players: PlayerDataStore) => void) {
  socket.on('players', callback);
}

export function subscribeToTile({ x, y }: BoardCoordinate, callback: (tile: TileConfig) => void) {
  socket.on(`tiles/${x},${y}`, callback);
}

export async function getTile({ x, y }: BoardCoordinate) {
  const response = await fetch(`${SERVER_URL}/tile/${x}/${y}`);
  return response.json() as Promise<TileConfig>;
}

export async function getGameSettings() {
  const response = await fetch(`${SERVER_URL}/game/settings`);
  return response.json() as Promise<GameSettings>;
}

export function shutdown() {
  socket.close();
  socket = connect(SERVER_URL);
}

export function resetBoard(size?: number) {
  socket.emit('reset board', size);
}
