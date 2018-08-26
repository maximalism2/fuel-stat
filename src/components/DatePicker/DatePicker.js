// @flow
import React, { Component } from "react";
import moment, { weekdays } from "moment";
import classnames from "classnames";

import { getMonthsWeeks, isSelectedDay, type TWeekDay } from "./DatePicker.helpers";

import styles from "./DatePicker.css";

type DatePickerProps = {
  isOpen: boolean,
  initialDate: Date,
  onDateSelect: (date: Date) => void,
};

type DatePickerState = {
  currentMonth: Date,
};

class DatePicker extends Component<DatePickerProps, DatePickerState> {
  state = {
    currentMonth: this.props.initialDate,
  };

  handleDateSelect = (day: Date) => () => this.props.onDateSelect(day);

  goToPrevMonth = () => {};

  goToNextMonth = () => {};

  renderWeekDayNames = (): React$Element<*>[] => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return weekDays.map(day => (
      <div key={day} className={styles.datePicker__dayName}>
        {day}
      </div>
    ));
  };

  renderMonthHeader() {
    const currentMonthMoment = moment(this.state.currentMonth);
    return (
      <header className={styles.datePicker__header}>
        <button className={styles.datePicker__changeMonthBtn} onClick={this.goToPrevMonth} type="button">
          {"<"}
        </button>
        <p className={styles.datePicker__monthName}>
          {currentMonthMoment.format("MMMM")} {currentMonthMoment.format("GGGG")}
        </p>
        <button className={styles.datePicker__changeMonthBtn} onClick={this.goToNextMonth} type="button">
          {">"}
        </button>
      </header>
    );
  }

  renderDay = (day: TWeekDay) => {
    const dayDate = moment(day === null ? undefined : day);

    const daySelectorCN = classnames({
      [styles.datePicker__dayBtn]: true,
      [styles.datePicker__dayBtn_selected]: isSelectedDay(dayDate, this.props.initialDate),
    });

    return (
      <div className={styles.datePicker__day}>
        {day === null ? null : (
          <button
            className={daySelectorCN}
            onClick={this.handleDateSelect(day ? new Date(day) : new Date())}
            type="button"
          >
            {dayDate.format("D")}
          </button>
        )}
      </div>
    );
  };

  renderWeek = (week: TWeekDay[], inde: number) => {
    return <div className={styles.datePicker__week}>{week.map(this.renderDay)}</div>;
  };

  renderMonth = () => {
    return (
      <div className={styles.datePicker__monthContainer}>
        <div className={styles.datePicker__dayNames}>{this.renderWeekDayNames()}</div>
        <div className={styles.datePicker__month}>{getMonthsWeeks(this.state.currentMonth).map(this.renderWeek)}</div>
      </div>
    );
  };

  render() {
    const { isOpen, initialDate } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div className={styles.datePicker}>
        {this.renderMonthHeader()}

        {this.renderMonth()}
      </div>
    );
  }
}

export default DatePicker;
