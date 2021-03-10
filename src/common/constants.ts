import { BoardInterface, Obstacles } from "../types/core";

export const GRID_SIZE = 10;
export const TILE_SIZE = 25;

export const INITIAL_BOARD: BoardInterface = {
  rows: [
    {
      cells: [
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null }
      ]
    },
    {
      cells: [
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: Obstacles.ROCK, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: Obstacles.ROCK, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null }
      ]
    },
    {
      cells: [
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '42', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null }
      ]
    },
    {
      cells: [
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: Obstacles.ROCK, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: Obstacles.ROCK, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null }
      ]
    },
    {
      cells: [
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null },
        { playerId: '', obstacle: null, attackedUntil: null }
      ]
    }
  ]
};
