// @flow
import type { AuthStore } from "./Auth";
import type { RecordsStore } from "./Records";

export type Store = {
  auth: AuthStore,
  records: RecordsStore,
  ui: UI,
};

export type UI = {};
