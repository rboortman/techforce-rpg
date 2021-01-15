import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Player } from "../common/interfaces";

// Private functions
async function savePlayer(player: Player) {
  const playerDocument = await firebase
    .firestore()
    .collection("players")
    .doc(player.id);

  await playerDocument.update(player);
}

// Public functions
export async function update(player: Player) {
  await savePlayer(player);
}

export async function fetchUsers () {
  const querySnapshot = await firebase
    .firestore()
    .collection("players")
    .get();

  const players: Player[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data() as {color: string};
    players.push({ id: doc.id,  ...data});
  });
  return players;
};

fetchUsers();