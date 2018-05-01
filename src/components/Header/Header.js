// @flow
import { h, Component } from "preact";
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

export default class Header extends Component {
  links: NavLinkType[] = [
    { title: "Home", href: "/" },
    { title: "Add record", href: "/new" },
    { title: "Settings", href: "/settings" },
    { title: "Logout", href: "/logout", dimmed: true }
  ];

  renderBurgerButton(navOpen: boolean) {
    const burgerCN = classnames({
      [style.header__burger]: true,
      [style.header__burger_open]: navOpen
    });

    return <span class={burgerCN} />;
  }

  renderLinks(links: NavLinkType[], navOpen: boolean, toggleNav: () => void) {
    return links.map((link, index) => (
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

  render(props: HeaderProps) {
    const { userData } = props;
    const userDataProps = Boolean(userData)
      ? {
          id: userData.id,
          displayName: userData.displayName,
          photoUrl: userData.photoURL,
          createdAt: userData.createdAt
        }
      : {};

    return (
      <header class={style.header}>
        <div class={style.header__visibleSection}>
          <button
            onClick={props.onNavToggle}
            class={style.header__togglerButton}
          >
            {this.renderBurgerButton(props.navOpen)}
          </button>
          <UserData
            loading={props.loading}
            navOpen={props.navOpen}
            loggedIn={Boolean(userData)}
            {...userDataProps}
          />
        </div>
        <nav class={style.header__nav}>
          {this.renderLinks(this.links, props.navOpen, props.onNavToggle)}
        </nav>
      </header>
    );
  }
}
