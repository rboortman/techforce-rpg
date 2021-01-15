import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Player, PlayerData } from "../common/interfaces";

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

export async function fetchPlayers () {
  
  const playerData: PlayerData = {};

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
