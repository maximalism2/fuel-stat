// @flow
import { h, Component } from "preact";
import classnames from "classnames";

import Header from "../Header/Header";

import style from "./style.css";

import type { CurrentUserType } from "../../lib/types/CurrentUser";

type LayoutProps = {|
  loading: boolean,
  loggedIn: boolean,
  currentUrl: string,
  userData: CurrentUserType,
  children: mixed[]
|};

type LayoutState = {
  navOpen: boolean
};

export default class Layout extends Component {
  state: LayoutState = {
    navOpen: false
  };

  toggle = () => {
    this.setState((state: LayoutState) => ({ navOpen: !state.navOpen }));
  };

  componentWillReceiveProps(nextProps: LayoutProps) {
    console.log({ nextProps });
    if (this.props.currentUrl !== nextProps.currentUrl && this.state.navOpen) {
      this.setState(() => ({ navOpen: false }));
    }
  }

  render(props: LayoutProps, state: LayoutState) {
    const layoutCN = classnames({
      [style.layout]: true,
      [style.layout_navOpen]: state.navOpen
    });

    const layoutContentCN = classnames({
      [style.layout__content]: true,
      [style.layout__content_navOpen]: state.navOpen
    });

    return (
      <main class={layoutCN}>
        <Header
          loading={props.loading}
          loggedIn={props.loggedIn}
          userData={props.userData}
          navOpen={state.navOpen}
          onNavToggle={this.toggle}
        />
        <section className={layoutContentCN}>{props.children}</section>
      </main>
    );
  }
}
