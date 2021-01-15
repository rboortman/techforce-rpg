export interface TileConfig {
  user: boolean;
}

interface InitActionInterface {
  type: "init";
}

interface MoveActionInterface {
  type: "move";
  payload: {
    direction: MoveDirection;
  };
}

export type ActionInterface = InitActionInterface | MoveActionInterface;

export type BoardType = TileConfig[][];

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
