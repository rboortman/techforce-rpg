export interface TileConfig {
  userId: string;
}
interface UpdateActionInterface {
  type: "update";
  payload: {
    board: BoardInterface;
  };
}

export type ActionInterface = UpdateActionInterface;

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
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export interface Player {
  color: string;
  id: string;
}
