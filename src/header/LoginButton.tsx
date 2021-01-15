import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "@material-ui/core";

const provider = new firebase.auth.GoogleAuthProvider();

export const LoginButton = () => {
  async function login() {
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Button onClick={login} color="inherit">
      Login
    </Button>
  );
};
