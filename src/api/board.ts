import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

import { callRemoteFunction } from './firebase';
import { BoardInterface, MoveDirection } from '../common/interfaces';

// Private functions

// Public Functions
export async function registerBoardUpdateListener(callback: (board: BoardInterface) => void) {
  const board = await firebase.firestore().collection('boards').doc('default');
  board.onSnapshot(doc => {
    const data = doc.data();
    if (data) {
      callback(data as BoardInterface);
    }
  });
}

export async function placeNewPlayerOnBoard() {
  await callRemoteFunction('getOnBoard');
}

export async function moveUser(direction: MoveDirection) {
  await callRemoteFunction('move', { direction });
}

export async function resetBoard(gridSize?: number) {
  await callRemoteFunction('resetBoard', { gridSize });
}
