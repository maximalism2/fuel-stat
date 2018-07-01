import firebase, { auth, database, googleAuthProvider } from "./firebase";
import type { FirebaseDataResponse } from "./types/common";
import type { Records } from "./types/Records";

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
      .catch(reject)
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

export const getRecordsRef = (uid: string): mixed => database.ref(`records/`);

export const getUserRecordsOnce = (userId: string): Promise<FirebaseDataResponse<Records>> => {
  return database
    .ref("records")
    .orderByChild("ownerId")
    .equalTo(userId)
    .once("value");
};
