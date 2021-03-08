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
