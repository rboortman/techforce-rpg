import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { Player, PlayerDataStore } from '../common/interfaces';

// Private functions
async function savePlayer(player: Player) {
  const playerDocument = await firebase.firestore().collection('players').doc(player.id);
  playerDocument.update(player);
}

// Public functions
export function updatePlayer(player: Player) {
  savePlayer(player);
}

export async function fetchPlayers() {
  const playerData: PlayerDataStore = {};

  const querySnapshot = await firebase.firestore().collection('players').get();

  querySnapshot.forEach(doc => {
    const data = { id: doc.id, ...doc.data() } as Player;
    playerData[doc.id] = data;
  });

  return playerData;
}

export async function registerPlayerStoreUpdateListener(listener: (playerDataStore: PlayerDataStore) => void) {
  const initialPlayerData = await fetchPlayers();
  listener(initialPlayerData);
  firebase
    .firestore()
    .collection('players')
    .onSnapshot(collection => {
      const newPlayerDataStore = { ...initialPlayerData };
      collection.forEach(doc => {
        const data = { id: doc.id, ...doc.data() } as Player;
        newPlayerDataStore[doc.id] = data;
      });
      listener(newPlayerDataStore);
    });
}
