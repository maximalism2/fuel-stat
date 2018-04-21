import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/messaging";
import "firebase/functions";

const config = {
  apiKey: "AIzaSyCEUjxUHRfL6twll8LCHP80grFvJIL8D3g",
  authDomain: "fuel-stat.firebaseapp.com",
  databaseURL: "https://fuel-stat.firebaseio.com",
  projectId: "fuel-stat",
  storageBucket: "fuel-stat.appspot.com",
  messagingSenderId: "585072921348"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
