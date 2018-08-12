// @flow
export type Action<T> = {
  type: string,
  payload: T,
};

export type Dispatcher = (Action<*>) => void;

export type DispatchProps = {
  dispatch: Dispatcher,
};

export type ThunkAction = (dispatch: Dispatcher) => void;

export type FirebaseDataResponse<T> = {
  val: () => T,
};

type SingleReactShildrenType = React$Element<*> | null | string;
export type ReactChildrenType =
  | SingleReactShildrenType
  | SingleReactShildrenType[]
  | (() => SingleReactShildrenType | (() => SingleReactShildrenType[]));
