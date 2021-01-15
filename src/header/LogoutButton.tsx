import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "@material-ui/core";

export const LogoutButton = () => (
  <Button onClick={() => firebase.auth().signOut()} color="inherit">
    Logout
  </Button>
);
