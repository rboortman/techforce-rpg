export interface TileConfig {
  userId: string;
  attackingUntil: Date | null;
  damage: number;
}

type Row = {
  cells: TileConfig[];
};
export interface BoardInterface {
  rows: Row[];
}

export interface BoardCoordinate {
  x: number;
  y: number;
}

export enum MoveDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export interface Player {
  id: string;
  name: string;
  color: string;
  isAdmin?: boolean;

  health: number;
  attack: number;
  speed: number;
  range: number;
}

export interface PartialPlayer {
  id?: string;
  name?: string;
  color?: string;
  isAdmin?: boolean;
  health?: number;
  attack?: number;
  speed?: number;
  range?: number;
}

export interface PlayerDataStore {
  [key: string]: Player;
}
