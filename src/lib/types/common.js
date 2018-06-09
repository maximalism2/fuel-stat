// @flow
export type Action<T> = {
  type: string,
  payload: T
};

export type Dispatcher = (Action<*>) => void;

export type DispatchProps = {
  dispatch: Dispatcher
};
