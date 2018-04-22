import { h, Component } from "preact";
import { Router } from "preact-router";

import {
  getCurrentUser,
  getRedirectResult,
  login
} from "../lib/firebase.helpers";

import Layout from "./Layout/Layout";
import Home from "../routes/Home/Home";
import New from "../routes/New/New.async";
import { CurrentUserType } from "../lib/types/CurrentUser";

export default class App extends Component {
  state = {
    signedIn: false,
    signInLoading: false,
    authChecking: true,
    authError: null
  };

  currentUser: CurrentUserType = null;

  setCurrentUserData = (plainData: mixed) => {
    if (!plainData || typeof plainData.toJSON !== "function") {
      return;
    }

    const data = plainData.toJSON();
    this.currentUser = {
      uid: data.uid,
      displayName: data.displayName,
      email: data.email,
      photoURL: data.photoURL,
      lastLoginAt: data.lastLoginAt,
      createdAt: data.createdAt
    };
  };

  login = async () => {
    let loginResult = null;

    this.setState(() => ({ signInLoading: true }));

    try {
      loginResult = await login(false);
    } catch (e) {
      this.setState(() => ({ signInLoading: false, authError: e.message }));
      return;
    }

    if (loginResult.user) {
      this.setCurrentUserData(loginResult.user);
      this.setState(() => ({ signInLoading: false, signedIn: true }));
    } else {
      this.setState(() => ({ signInLoading: false, signedIn: false }));
    }
  };

  checkRedirectResult = async () => {
    const plainData = await getRedirectResult();
    this.setCurrentUserData(plainData);

    this.setState(() => ({
      authChecking: false,
      signedIn: this.currentUser !== null
    }));
  };

  async componentDidMount() {
    const plainData = await getCurrentUser();
    this.setCurrentUserData(plainData);

    if (this.currentUser === null) {
      this.checkRedirectResult();
    } else {
      this.setState(() => ({ authChecking: false, signedIn: true }));
    }
  }

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render(props, state) {
    if (state.authChecking) {
      return <h1>Checking auth status</h1>;
    }

    if (state.signInLoading) {
      return <h1>Authenticating</h1>;
    }

    if (state.authError !== null) {
      return (
        <div>
          <h1>Something bad happened during auth...</h1>
          <code>{state.authError.message}</code>
        </div>
      );
    }

    if (state.signedIn === false) {
      return (
        <div>
          <h1>You are not logged in</h1>
          <button onClick={this.login}>Login with google</button>
        </div>
      );
    }

    return (
      <Layout
        userData={this.currentUser}
        loading={state.authChecking || state.signInLoading}
        loggedIn={state.signedIn}
      >
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <New path="/new" />
          <Home path="/settings" />
        </Router>
      </Layout>
    );
  }
}
