import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { gridSize } from '../common/generalVariables';
import { BoardCoordinate, BoardInterface, MoveDirection } from '../common/interfaces';

// Private functions
function findUser(board: BoardInterface, userId: string) {
  let position: BoardCoordinate | undefined;
  board.rows.forEach((row, i) => {
    row.cells.forEach((cell, j) => {
      if (cell.userId === userId) position = { x: j, y: i };
    });
  });
  return position;
}

function setUserOnBoard(board: BoardInterface, userId: string, newPosition: BoardCoordinate) {
  if (findUser(board, userId)) {
    return board;
  }

  const newBoardState: BoardInterface = {
    rows: board.rows.map((row, i) => ({
      cells: row.cells.map((cell, j) => {
        if (cell.userId !== '' && cell.userId !== userId) {
          return cell;
        }
        return {
          userId: i === newPosition.y && j === newPosition.x ? userId : ''
        };
      })
    }))
  };
  return newBoardState;
}

function findFreeCell(board: BoardInterface) {
  let freeCell: BoardCoordinate | undefined;
  board.rows.forEach((row, y) => {
    row.cells.forEach((cell, x) => {
      if (cell.userId === '') {
        freeCell = { x, y };
      }
    });
  });
  return freeCell;
}

async function saveBoard(board: BoardInterface) {
  const boardDocument = await firebase.firestore().collection('boards').doc('default');

  await boardDocument.update(board);
}

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

export async function placeNewPlayerOnBoard(board: BoardInterface, userId: string) {
  let freeCell = findFreeCell(board);
  if (!freeCell) {
    console.log('No free cell found..?!');
    return;
  }
  const newBoard = setUserOnBoard(board, userId, freeCell);
  await saveBoard(newBoard);
}

export async function resetBoard() {
  let newState: BoardInterface = { rows: [{ cells: [] }] };
  for (let i = 0; i < gridSize; i++) {
    newState.rows[i] = { cells: [] };
    for (let j = 0; j < gridSize; j++) {
      newState.rows[i].cells[j] = {
        userId: ''
      };
    }
  }
  await saveBoard(newState);
}

export async function moveUser(board: BoardInterface, direction: MoveDirection, userId: string) {
  const position = findUser(board, userId);

  console.log(board);

  if (position) {
    let newPosition = { ...position };
    switch (direction) {
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
    if (newPosition.x < 0 || newPosition.x >= gridSize || newPosition.y < 0 || newPosition.y >= gridSize) {
      newPosition = { ...position };
    }

    const newBoardState = setUserOnBoard(board, userId, newPosition);
    await saveBoard(newBoardState);
  }
}
