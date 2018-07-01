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
