import { h, Component } from "preact";
import {
  getCurrentUser,
  getRedirectResult,
  login
} from "../../lib/firebase.helpers";
import style from "./style";

export default class Home extends Component {
  state = {
    signedIn: false,
    signInLoading: false,
    authChecking: true,
    authError: null
  };

  currentUser = null;

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
      this.currentUser = loginResult.user;
      this.setState(() => ({ signInLoading: false, signedIn: true }));
    } else {
      this.setState(() => ({ signInLoading: false, signedIn: false }));
    }
  };

  checkRedirectResult = async () => {
    this.currentUser = await getRedirectResult();

    this.setState(() => ({
      authChecking: false,
      signedIn: this.currentUser !== null
    }));
  };

  async componentDidMount() {
    this.currentUser = await getCurrentUser();

    if (this.currentUser === null) {
      this.checkRedirectResult();
    } else {
      this.setState(() => ({ authChecking: false, signedIn: true }));
    }
  }

  render(props, state) {
    if (state.authChecking) {
      return <h1 class={style.home}>Checking auth status</h1>;
    }

    if (state.signInLoading) {
      return <h1 class={style.home}>Authenticating</h1>;
    }

    if (state.authError !== null) {
      return (
        <div class={style.home}>
          <h1>Something bad happened during auth...</h1>
          <code>{state.authError.message}</code>
        </div>
      );
    }

    if (state.signedIn) {
      return (
        <div class={style.home}>
          <h1>You are signed in as:</h1>
          <code>{JSON.stringify(this.currentUser)}</code>
        </div>
      );
    }

    return (
      <div class={style.home}>
        <h1>Home</h1>
        <code>
          Current user:
          {JSON.stringify(this.currentUser)}
        </code>
        <button onClick={this.login}>Login with google</button>
      </div>
    );
  }
}
