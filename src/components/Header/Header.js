// @flow
import React, { Component } from "react";
import { Link } from "preact-router/match";
import classnames from "classnames";
import UserData from "../UserData/UserData";
import style from "./style.css";

import type { CurrentUserType } from "../../lib/types/CurrentUser";

type HeaderProps = {
  loading: boolean,
  loggedIn: boolean,
  navOpen: boolean,
  onNavToggle: () => void,
  userData?: CurrentUserType
};

type NavLinkType = {
  title: string,
  href: string,
  dimmed?: boolean
};

export default class Header extends Component<HeaderProps> {
  links: NavLinkType[] = [
    { title: "Home", href: "/" },
    { title: "Add record", href: "/new" },
    { title: "Settings", href: "/settings" },
    { title: "Logout", href: "/logout", dimmed: true }
  ];

  getUserDataProps(userData?: CurrentUserType): mixed {
    if (!userData) {
      return {};
    }

    return {
      id: userData.uid,
      displayName: userData.displayName,
      photoUrl: userData.photoURL,
      createdAt: userData.createdAt
    };
  }

  renderBurgerButton(navOpen: boolean) {
    const burgerCN = classnames({
      [style.header__burger]: true,
      [style.header__burger_open]: navOpen
    });

    return <span class={burgerCN} />;
  }

  renderLinks(
    links: Array<NavLinkType>,
    navOpen: boolean,
    toggleNav: () => void
  ): React$Element<*>[] {
    return links.map((link: NavLinkType, index: number) => (
      <Link
        activeClassName={style.header__navLink_active}
        class={classnames({
          [style.header__navLink]: true,
          [style.header__navLink_dimmed]: link.dimmed === true,
          [style.header__navLink_navHidden]: navOpen === false
        })}
        style={{ transitionDelay: `.${index}s` }}
        href={link.href}
        onClick={toggleNav}
      >
        {link.title}
      </Link>
    ));
  }

  render() {
    const { userData, onNavToggle, loading, navOpen } = this.props;
    const userDataProps = this.getUserDataProps(userData);

    return (
      <header class={style.header}>
        <div class={style.header__visibleSection}>
          <button onClick={onNavToggle} class={style.header__togglerButton}>
            {this.renderBurgerButton(navOpen)}
          </button>
          <UserData
            loading={loading}
            navOpen={navOpen}
            loggedIn={Boolean(userData)}
            {...userDataProps}
          />
        </div>
        <nav class={style.header__nav}>
          {this.renderLinks(this.links, navOpen, onNavToggle)}
        </nav>
      </header>
    );
  }
}
