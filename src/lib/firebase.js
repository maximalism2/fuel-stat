const firebase = (() => {
  if (typeof window.firebase === "undefined") {
    throw new Error("There is no Firebase loaded");
  }

  return window.firebase;
})();

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
