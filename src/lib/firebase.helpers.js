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
  new Promise(async (resolve, reject) => {
    let loginResult = null;
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    if (isMobile) {
      auth.signInWithRedirect(googleAuthProvider);
    } else {
      try {
        loginResult = await auth.signInWithPopup(googleAuthProvider);
        resolve(loginResult);
      } catch (e) {
        reject(e);
      }
    }
  });

export const getSnapshot = () =>
  new Promise(async (resolve, reject) => {
    try {
      const snapshow = await database.ref().once("value");
      resolve(snapshow);
    } catch (e) {
      reject(e);
    }
  });

export const getRecordsRef = (uid: string): mixed => {
  if (typeof uid !== "string" || uid.length === 0) {
    throw new Error("uid must be a valid user id, but you passed " + uid);
  }

  return database.ref(`records/${uid}`);
};
