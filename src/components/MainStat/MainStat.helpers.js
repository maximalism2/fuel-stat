// @flow
import type { Records } from "../../lib/types/Records";

export type MainStatProps = {
  records: Records,
};

export const getTotalLitres = (records: Records): number =>
  Object.keys(records).reduce((acc, curr, index, arr) => acc + records[curr].litresFilled, 0);

export const getTrackedMilage = (records: Records): number => {
  const recordedMilages: number[] = Object.keys(records).map(recordId => records[recordId].totalCarMileage);
  const recordedMilagesWithDefaults = recordedMilages.length ? recordedMilages : [0];
  console.log(records, recordedMilages);
  return Math.max(...recordedMilagesWithDefaults) - Math.min(...recordedMilagesWithDefaults);
};
