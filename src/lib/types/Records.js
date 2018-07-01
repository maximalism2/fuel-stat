// @flow
export type RecordsStore = {
  state: RecordsState,
  data: RecordsData,
};

export type RecordsState = {
  loading: boolean,
  error: boolean,
  errorMessage: string,
};

export type RecordsData = {
  records: Records,
  ids: string[],
};

export type Records = {
  [recordId: string]: Record,
};

export type Record = {
  ownerId: string,
  litresFilled: number,
  refillingDate: string,
  refillingPrice: number,
  totalCarMileage: number,
};

type RecordsStateKeys = "loading" | "error" | "errorMessage";

export type RecordsStateSlice = {
  [key: RecordsStateKeys]: mixed,
};
