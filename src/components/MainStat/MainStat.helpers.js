// @flow
import type { Records } from "../../lib/types/Records";

export type MainStatProps = {
  records: Records,
};

export const getTotalLitres = (records: Records): number =>
  Object.keys(records).reduce((acc, curr) => acc + records[curr].litresFilled, 0);

export const getTrackedMilage = (records: Records): number =>
  getMilageValue(records, "max") - getMilageValue(records, "min");

export const getMilageValue = (records: Records, edge: "min" | "max"): number =>
  Math[edge](...Object.keys(records).map(recordId => records[recordId].totalCarMileage));
