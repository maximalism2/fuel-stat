// @flow
import React, { Component } from "react";
import classnames from "classnames";

import Header from "../Header/Header";

import style from "./style.css";

import type { CurrentUserType } from "../../lib/types/CurrentUser";

type LayoutProps = {
  loading: boolean,
  loggedIn: boolean,
  currentUrl: string,
  userData: CurrentUserType,
};

type LayoutState = {
  navOpen: boolean,
};

export default class Layout extends Component<LayoutProps, LayoutState> {
  state: LayoutState = {
    navOpen: false,
  };

  toggle = () => {
    this.setState((state: LayoutState) => ({ navOpen: !state.navOpen }));
  };

  componentWillReceiveProps(nextProps: LayoutProps) {
    if (this.props.currentUrl !== nextProps.currentUrl && this.state.navOpen) {
      this.setState(() => ({ navOpen: false }));
    }
  }

  render() {
    const { loading, loggedIn, userData, children } = this.props;
    const { navOpen } = this.state;

    const layoutCN = classnames({
      [style.layout]: true,
      [style.layout_navOpen]: navOpen,
    });

    const layoutContentCN = classnames({
      [style.layout__content]: true,
      [style.layout__content_navOpen]: navOpen,
    });

    return (
      <main class={layoutCN}>
        <Header loading={loading} loggedIn={loggedIn} userData={userData} navOpen={navOpen} onNavToggle={this.toggle} />
        <section className={layoutContentCN}>{children}</section>
      </main>
    );
  }
}
