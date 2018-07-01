// @flow
import { combineReducers } from "redux";

import { RECORDS_ACTIONS } from "../actions/records";

import type { Action } from "../lib/types/common";
import type { RecordsState, Records, RecordsData } from "../lib/types/Records";

const DEFAULT_RECORDS_STATE: RecordsState = {
  loading: false,
  error: false,
  errorMessage: "",
};

const recordsState = (state?: RecordsState = DEFAULT_RECORDS_STATE, action: Action<*>): RecordsState => {
  switch (action.type) {
    case RECORDS_ACTIONS.CHANGE_RECORDS_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RECORDS_ACTIONS.STORE_RECORDS: {
      const isRecordsLoaded: boolean = action.payload !== null;
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

const DEFAULT_RECORDS: RecordsData = {
  records: {},
  ids: [],
};

const records = (state?: RecordsData = DEFAULT_RECORDS, action: Action<*>): RecordsData => {
  switch (action.type) {
    case RECORDS_ACTIONS.STORE_RECORDS: {
      const records: Records = action.payload;
      const recordsIds: string[] = Object.keys(records);
      return {
        records,
        ids: recordsIds,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  state: recordsState,
  data: records,
});
