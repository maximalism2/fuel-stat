// @flow
import type { CurrentUserType } from "./CurrentUser";

export type AuthStore = {
  state: AuthState,
  userData: CurrentUserType | null,
};

export type AuthState = {
  signedIn: boolean,
  signInLoading: boolean,
  authChecking: boolean,
  authError: any,
};

export type AuthStateKey = "signedIn" | "signInLoading" | "authChecking" | "authError";

export type AuthStateSlice = {
  [key: AuthStateKey]: mixed,
};
