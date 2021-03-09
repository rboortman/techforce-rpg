export enum Obstacles {
  ROCK = 'rock'
}

export interface GameSettings {
  gridSize: number;
}

type Row = {
  cells: TileConfig[];
};
export interface BoardInterface {
  rows: Row[];
}

export interface TileConfig {
  playerId: string;
  playerColor: string;
  obstacle: Obstacles | null;
  attackingUntil: Date | null;
  damage: number;
  attackedBy: string
}

export enum MoveDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export interface BoardCoordinate {
  x: number;
  y: number;
}