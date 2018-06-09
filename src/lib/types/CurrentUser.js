// @flow

export type CurrentUserType = UserData | null;

export type UserData = {
  uid: string,
  displayName: string,
  email: string,
  photoURL: string,
  lastLoginAt: string,
  createdAt: string
};
