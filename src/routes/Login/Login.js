// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classnames from "classnames";

import { parseUserData } from "../../lib/helpers";
import { login } from "../../lib/firebase.helpers";
import { storeUserDataAndChangeStatus, changeAuthStatus } from "../../actions/auth";

import type { Store } from "../../lib/types/Store";
import type { AuthState } from "../../lib/types/auth";
import type { CurrentUserType, UserData } from "../../lib/types/CurrentUser";
import type { Dispatcher } from "../../lib/types/common";
import type { ChangeAuthStatus, StoreUserDataAndChangeStatus } from "../../actions/auth";

import googleIcon from "../../assets/icons/google_icon.svg";
import gasPumpIcon from "../../assets/gas-pump.svg";
import styles from "./Login.css";

type LoginProps = {
  authState: AuthState,
  changeAuthStatus: ChangeAuthStatus,
  storeUserDataAndChangeStatus: StoreUserDataAndChangeStatus,
};

class Login extends Component<LoginProps> {
  login = () => {
    let loginResult = null;

    this.props.changeAuthStatus({ signInLoading: true });

    login(true)
      .then(loginResult => {
        if (loginResult.user) {
          const userData: CurrentUserType = parseUserData(loginResult.user);

          if (userData !== null) {
            this.props.storeUserDataAndChangeStatus(userData);
          }
        } else {
          this.props.changeAuthStatus({ signInLoading: false, signedIn: false });
        }
      })
      .catch(e => {
        this.props.changeAuthStatus({ signInLoading: false, authError: e.message });
      });
  };

  render() {
    const { authState } = this.props;

    const buttonCN = classnames({
      [styles.login__button]: true,
      [styles.login__button_loading]: authState.signInLoading,
    });

    const status = authState.signInLoading
      ? "Authenticating..."
      : authState.authChecking
        ? "Checking auth status..."
        : "";

    return (
      <main class={styles.login}>
        <div class={styles.login__iconWrapper}>
          <img src={gasPumpIcon} class={styles.login__icon} />
          <h1 class={styles.login__title}>Fuel-Stats</h1>
        </div>

        <div class={styles.login__controlsWrapper}>
          <h2 class={styles.login__subtitle}>Login with:</h2>
          <button onClick={this.login} class={buttonCN} disabled={authState.authChecking || authState.signInLoading}>
            <img src={googleIcon} aria-hidden />
            Google
          </button>
        </div>

        <div class={styles.login__statusText}>{status}</div>
      </main>
    );
  }
}

const mapStateToProps = (state: Store, ownProps: LoginProps): LoginProps => ({
  authState: state.auth.state,
  ...ownProps,
});

const mapDispatchToProps = (dispatch: Dispatcher, ownProps: LoginProps): LoginProps => {
  const actionCreators = {
    changeAuthStatus,
    storeUserDataAndChangeStatus,
  };

  return {
    ...ownProps,
    ...bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
