// @flow
import moment from "moment";

export type TWeekDay = string | null;

export const getMonthsWeeks = (currentMonth: Date): TWeekDay[][] => {
  const res = [];
  const currentDayDate = new Date(currentMonth);
  const numberOfDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const monthStartsFrom = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDay();
  const numberOfRows = Math.ceil((numberOfDays + monthStartsFrom) / 7);

  for (let i = 0, currentDate = 1; i < numberOfRows; i += 1) {
    const week = [];

    for (let j = 0; j < 7; j += 1) {
      if (i === 0 && j < monthStartsFrom) {
        week.push(null);
      } else if (currentDate <= numberOfDays) {
        currentDayDate.setDate(currentDate);
        week.push(currentDayDate.toUTCString());
        currentDate += 1;
      } else {
        week.push(null);
      }
    }

    res.push(week);
  }

  return res;
};

export const isSelectedDay = (date: moment, initialDate: Date) =>
  date.isSame(initialDate, "year") && date.isSame(initialDate, "month") && date.isSame(initialDate, "day");
