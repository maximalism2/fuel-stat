// @flow
import firebase, { auth, database, googleAuthProvider } from "./firebase";

export const getCurrentUser = () =>
  new Promise(resolve =>
    auth.onAuthStateChanged(user => {
      resolve(user);
    })
  );

export const getRedirectResult = () =>
  new Promise((resolve, reject) =>
    auth
      .getRedirectResult()
      .then(result => resolve(result.user))
      .catch(error => reject(error))
  );

export const login = (isMobile: boolean) =>
  new Promise((resolve, reject) => {
    let loginResult = null;
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      if (isMobile) {
        auth.signInWithRedirect(googleAuthProvider);
      } else {
        auth
          .signInWithPopup(googleAuthProvider)
          .then(resolve)
          .catch(reject);
      }
    });
  });

export const getSnapshot = () => database.ref().once("value");

export const getRecordsRef = (uid: string): mixed => {
  if (typeof uid !== "string" || uid.length === 0) {
    throw new Error("uid must be a valid user id, but you passed " + uid);
  }

  return database.ref(`records/${uid}`);
};
