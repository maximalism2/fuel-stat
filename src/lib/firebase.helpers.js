import firebase, { auth, googleAuthProvider } from './firebase';

export const getCurrentUser = () => new Promise((resolve) =>
	auth.onAuthStateChanged(user => {
		resolve(user);
	})
);

export const getRedirectResult = () => new Promise((resolve, reject) =>
	auth.getRedirectResult()
		.then(result =>  resolve(result.user))
		.catch(error => reject(error))
);

export const login = (isMobile) => new Promise(async (resolve, reject) => {
	let loginResult = null;
	await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

	if (isMobile) {
		auth.signInWithRedirect(googleAuthProvider);
	}
	else {
		try {
			loginResult = await auth.signInWithPopup(googleAuthProvider);
			resolve(loginResult);
		}
		catch (e) {
			reject(e);
		}
	}
});

