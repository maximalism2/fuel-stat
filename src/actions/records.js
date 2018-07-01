// @flow
import { getUserRecordsOnce } from "../lib/firebase.helpers";
import type { Action, ThunkAction, FirebaseDataResponse } from "../lib/types/common";
import type { Records, RecordsStateSlice } from "../lib/types/Records";

export const RECORDS_ACTIONS = {
  CHANGE_RECORDS_STATE: "RECORDS_ACTIONS/CHANGE_RECORDS_STATE",
  STORE_RECORDS: "RECORDS_ACTIONS/STORE_RECORDS",
};

export type ChangeRecordsState = (s: RecordsStateSlice) => Action<RecordsStateSlice>;
export const changeRecordsState: ChangeRecordsState = stateSlice => ({
  type: RECORDS_ACTIONS.CHANGE_RECORDS_STATE,
  payload: stateSlice,
});

export type StoreUserRecords = (r: Records) => Action<Records>;
export const storeUserRecords: StoreUserRecords = records => ({
  type: RECORDS_ACTIONS.STORE_RECORDS,
  payload: records,
});

export type LoadRecords = (userId: string) => ThunkAction;
export const loadRecords: LoadRecords = userId => dispatch => {
  dispatch(changeRecordsState({ loading: true }));

  getUserRecordsOnce(userId).then(data => {
    const records: Records = data.val();
    dispatch(storeUserRecords(records));
  });
};
