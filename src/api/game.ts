import { connect } from 'socket.io-client';
import { BoardInterface, MoveDirection } from '../common/interfaces';

let userId = '';

const socket = connect('http://localhost:8080')
socket.on('connect', () => {
  console.log('joining game');
  
})

export function joinGame (id: string) {
  userId = id;
  socket.emit('join game', id);
}

export function move(direction: MoveDirection, speed: number) {
  socket.emit('move', userId, direction, speed);
}

export function subscribeToBoard(callback: (board: BoardInterface) => void) {
  socket.on('board', callback);
}