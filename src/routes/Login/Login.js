// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classnames from "classnames";

import { loginUser } from "../../actions/auth";

import type { Store } from "../../lib/types/Store";
import type { AuthState } from "../../lib/types/auth";
import type { CurrentUserType, UserData } from "../../lib/types/CurrentUser";
import type { Dispatcher } from "../../lib/types/common";
import type { LoginUser } from "../../actions/auth";

import googleIcon from "../../assets/icons/google_icon.svg";
import gasPumpIcon from "../../assets/gas-pump.svg";
import spinner from "../../assets/icons/spinner_grey.svg";
import styles from "./Login.css";

type LoginProps = {
  authState: AuthState,
  loginUser: LoginUser,
};

class Login extends Component<LoginProps> {
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

        {!authState.authChecking ? (
          <div class={styles.login__controlsWrapper}>
            <h2 class={styles.login__subtitle}>Login with:</h2>
            <button
              onClick={this.props.loginUser}
              class={buttonCN}
              disabled={authState.authChecking || authState.signInLoading}
            >
              <img src={googleIcon} aria-hidden />
              Google
            </button>
          </div>
        ) : (
          <img src={spinner} class={styles.login__spinner} />
        )}

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
    loginUser,
  };

  return {
    ...ownProps,
    ...bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
