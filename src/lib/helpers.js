// @flow
import type { CurrentUserType, UserData } from "./types/CurrentUser";

export const parseUserData = (plainData: mixed): CurrentUserType => {
  if (!plainData || typeof plainData.toJSON !== "function") {
    return null;
  }

  const data: UserData = plainData.toJSON();

  return {
    uid: data.uid,
    displayName: data.displayName,
    email: data.email,
    photoURL: data.photoURL,
    lastLoginAt: data.lastLoginAt,
    createdAt: data.createdAt,
  };
};
