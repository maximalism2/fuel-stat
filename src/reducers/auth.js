// @flow
import { combineReducers } from "redux";

import { AUTH_ACTIONS } from "../actions/auth";

import type { AuthStore, AuthState, AuthStateSlice } from "../lib/types/Auth";
import type { UserData, CurrentUserType } from "../lib/types/CurrentUser";
import type { Action } from "../lib/types/common";

const DEFAULT_AUTH_STATE: AuthState = {
  signedIn: false,
  signInLoading: false,
  authChecking: true,
  authError: null,
};

const stateReducer = (state?: AuthState = DEFAULT_AUTH_STATE, action: Action<*>): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.STORE_USERDATA_AND_CHANGE_STATUS: {
      return {
        ...state,
        signInLoading: false,
        authChecking: false,
        signedIn: true,
      };
    }
    case AUTH_ACTIONS.CHANGE_AUTH_STATUS: {
      const slice: AuthStateSlice = action.payload;
      return {
        ...state,
        ...slice,
      };
    }
    default:
      return state;
  }
};

const userDataReducer = (state?: CurrentUserType = null, action: Action<*>): CurrentUserType => {
  switch (action.type) {
    case AUTH_ACTIONS.STORE_USERDATA_AND_CHANGE_STATUS: {
      const userData: UserData = action.payload;
      return userData;
    }
    default:
      return state;
  }
};

export default combineReducers({
  state: stateReducer,
  userData: userDataReducer,
});
