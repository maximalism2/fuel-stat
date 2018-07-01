// @flow
import { login as firebaseLogin } from "../lib/firebase.helpers";
import { parseUserData } from "../lib/helpers";

import type { Action } from "../lib/types/common";
import type { UserData, CurrentUserType } from "../lib/types/CurrentUser";
import type { AuthStateKey, AuthStateSlice } from "../lib/types/Auth";
import type { ThunkAction } from "../lib/types/common";

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

export type LoginUser = (isMobile?: boolean) => ThunkAction;
export const loginUser: LoginUser = (isMobile = true) => dispatch => {
  dispatch(changeAuthStatus({ signInLoading: true }));

  firebaseLogin(isMobile)
    .then(loginResult => {
      if (loginResult.user) {
        const userData: CurrentUserType = parseUserData(loginResult.user);

        if (userData !== null) {
          dispatch(storeUserDataAndChangeStatus(userData));
        }
      } else {
        dispatch(changeAuthStatus({ signInLoading: false, signedIn: false }));
      }
    })
    .catch(e => {
      dispatch(changeAuthStatus({ signInLoading: false, authError: e.message }));
    });
};
