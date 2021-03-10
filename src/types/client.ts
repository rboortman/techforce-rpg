export interface Player {
  id: string;
  name: string;
  color: string;
  isAdmin?: boolean;
}

export interface PartialPlayer {
  id?: string;
  name?: string;
  color?: string;
  isAdmin?: boolean;
}

export interface PlayerDataStore {
  [key: string]: Player;
}
