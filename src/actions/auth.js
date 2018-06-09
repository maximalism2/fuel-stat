// @flow
import type { Action } from "../lib/types/common";
import type { UserData } from "../lib/types/CurrentUser";
import type { AuthStateKey, AuthStateSlice } from "../lib/types/Auth";

export const AUTH_ACTIONS = {
  LOGOUT: "AUTH/LOGOUT",
  STORE_USERDATA: "AUTH/STORE_USERDATA",
  STORE_USERDATA_AND_CHANGE_STATUS: "AUTH/STORE_USERDATA_AND_CHANGE_STATUS",
  CHANGE_AUTH_STATUS: "AUTH/CHANGE_AUTH_STATUS",
};

export type ChangeAuthStatus = (a: AuthStateSlice) => Action<AuthStateSlice>;
export const changeAuthStatus: ChangeAuthStatus = payload => ({
  type: AUTH_ACTIONS.CHANGE_AUTH_STATUS,
  payload,
});

export type StoreUserDataAndChangeStatus = (u: UserData) => Action<UserData>;
export const storeUserDataAndChangeStatus: StoreUserDataAndChangeStatus = payload => ({
  type: AUTH_ACTIONS.STORE_USERDATA_AND_CHANGE_STATUS,
  payload,
});
