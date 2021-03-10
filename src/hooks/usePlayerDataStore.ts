import { useEffect, useState } from "react";
import { subscribeToPlayers } from "../api/game";
import { PlayerDataStore } from "../types/client";

export const usePlayerDataStore = () => {

  // Subscribe to player data store
  const [playerDataStore, setPlayerDataStore] = useState<PlayerDataStore>({});
  useEffect(() => {
    subscribeToPlayers(players => {
      setPlayerDataStore(players);
    });
  });

  return playerDataStore;
}