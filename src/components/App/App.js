// @flow
import React, { Component } from "react";
import { Router } from "preact-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getCurrentUser, getRedirectResult } from "../../lib/firebase.helpers";
import { parseUserData } from "../../lib/helpers";
import { storeUserDataAndChangeStatus, changeAuthStatus } from "../../actions/auth";

import type { CurrentUserType, UserData } from "../../lib/types/CurrentUser";
import type { AuthState } from "../../lib/types/Auth";
import type { Store } from "../../lib/types/Store";
import type { Action, Dispatcher } from "../../lib/types/common";
import type { StoreUserDataAndChangeStatus, ChangeAuthStatus } from "../../actions/auth";

import Layout from "../Layout/Layout";
import Home from "../../routes/Home/Home";
import New from "../../routes/New/New.async";
import Login from "../../routes/Login/Login.async";

type AppProps = {
  authState: AuthState,
  currentUserData: CurrentUserType,
  storeUserDataAndChangeStatus: StoreUserDataAndChangeStatus,
  changeAuthStatus: ChangeAuthStatus,
};

class App extends Component<AppProps> {
  currentUrl: string;

  checkRedirectResult = () =>
    getRedirectResult().then(plainData => {
      const userData = parseUserData(plainData);

      if (userData !== null) {
        this.props.storeUserDataAndChangeStatus(userData);
      } else {
        this.props.changeAuthStatus({ authChecking: false });
      }
    });

  componentDidMount() {
    getCurrentUser().then(plainData => {
      const userData = parseUserData(plainData);

      if (userData === null) {
        this.checkRedirectResult();
      } else {
        this.props.storeUserDataAndChangeStatus(userData);
      }
    });
  }

  /** Gets fired when the route changes.
   *  @param {Object} event "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    const { authState, currentUserData } = this.props;

    if (authState.authChecking) {
      return <h1>Checking auth status</h1>;
    }

    if (authState.signInLoading) {
      return <h1>Authenticating</h1>;
    }

    if (authState.authError !== null) {
      return (
        <div>
          <h1>Something bad happened during auth...</h1>
          <code>{authState.authError.message}</code>
        </div>
      );
    }

    if (authState.signedIn === false) {
      return <Login />;
    }

    return (
      <Layout
        userData={currentUserData}
        loading={authState.authChecking || authState.signInLoading}
        loggedIn={authState.signedIn}
        currentUrl={this.currentUrl}
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

const mapStateToProps = (state: Store, ownProps: AppProps): AppProps => ({
  ...ownProps,
  authState: state.auth.state,
  currentUserData: state.auth.userData,
});

const mapDidpatchToProps = (dispatch: Dispatcher, ownProps: AppProps): AppProps => {
  const actionCreators = {
    storeUserDataAndChangeStatus,
    changeAuthStatus,
  };

  return {
    ...ownProps,
    ...bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDidpatchToProps)(App);
