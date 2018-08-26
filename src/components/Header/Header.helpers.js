// @flow
import { logout } from "../../lib/firebase.helpers";

import type { CurrentUserType } from "../../lib/types/CurrentUser";

export type HeaderProps = {
  loading: boolean,
  loggedIn: boolean,
  navOpen: boolean,
  onNavToggle: () => void,
  userData?: CurrentUserType,
};

export type NavLinkType = {
  title: string,
  href: string,
  dimmed?: boolean,
  clickHandler?: () => void | Promise<void>,
};

export const links: NavLinkType[] = [
  { title: "Home", href: "/" },
  { title: "Add record", href: "/new" },
  { title: "Settings", href: "/settings" },
  { title: "Logout", href: "/logout", dimmed: true, clickHandler: logout },
];
