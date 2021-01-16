import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Player, PlayerDataStore } from "../common/interfaces";

// Public functions
async function savePlayer(player: Player) {
  const playerDocument = await firebase
    .firestore()
    .collection("players")
    .doc(player.id);

  await playerDocument.update(player);
}

export async function updatePlayer(player: Player) {
  await savePlayer(player);
}

export async function registerPlayerStoreUpdateListener (
  listener: (playerDataStore: PlayerDataStore) => void
) {
  const initialPlayerData = await fetchPlayers();
  listener(initialPlayerData);
  await firebase
    .firestore()
    .collection("players")
    .onSnapshot(collection => {
      collection.forEach((doc) => {
        const data = {id: doc.id, ...doc.data()} as Player;
        initialPlayerData[doc.id] = data
      });
      listener(initialPlayerData)
    })

}

export async function fetchPlayers () {
  
  const playerData: PlayerDataStore = {};

  const querySnapshot = await firebase
    .firestore()
    .collection("players")
    .get();

  querySnapshot.forEach((doc) => {
    const data = {id: doc.id, ...doc.data()} as Player;
    playerData[doc.id] = data;
  });

  return playerData;
};
