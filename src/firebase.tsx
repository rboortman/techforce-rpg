import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

import { Button } from "@material-ui/core";

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyCcuivg2WuBqEtg9F80uPOFbdZRVa4iGDI",
  authDomain: "techforcerpg.firebaseapp.com",
  projectId: "techforcerpg",
  storageBucket: "techforcerpg.appspot.com",
  messagingSenderId: "724375797319",
  appId: "1:724375797319:web:76452d6978d05401e7fb62",
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

export const LoginButton = () => {
  return (
    <Button
      onClick={() => firebase.auth().signInWithPopup(provider)}
      color="inherit"
    >
      Login
    </Button>
  );
};

export const LogoutButton = () => (
  <Button onClick={() => firebase.auth().signOut()} color="inherit">
    Logout
  </Button>
);
