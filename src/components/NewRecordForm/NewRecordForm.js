// @flow
import React, { Component } from "react";
import moment from "moment";

import DatePicker from "../DatePicker/DatePicker";
import { getSnapshot, getRecordsRef } from "../../lib/firebase.helpers";
// import { acceptNumber } from "./New.helpers";

import style from "./style.css";

type NewRecrodFormProps = {
  loading: boolean,
  onSubmit: (fields: NewRecrodFormState) => void,
};

type NewRecrodFormState = {
  litresFilled: number,
  refillingDate: string,
  totalCarMileage: number,
  refillingPrice: number,
  selectedDate: Date,
};

export default class New extends Component<NewRecrodFormProps, NewRecrodFormState> {
  recordsDataRef = null;

  state: NewRecrodFormState = {
    litresFilled: 0,
    totalCarMileage: 0,
    refillingPrice: 0,
    selectedDate: new Date(),
  };

  formatDate(date: Date): string {
    return moment(date).format("LL");
  }

  submit = (e: Event) => {
    if (e) {
      e.preventDefault();
    }
    this.props.onSubmit(this.state);
  };

  handleInputChange = (e: KeyboardEvent) => {
    (e.currentTarget: HTMLInputElement);
    switch (e.currentTarget.name) {
      // case "litresFilled": {
      //   if (/\d/.test(e.key) === false && e.key !== ".") {
      //     e.preventDefault();
      //     return;
      //   }
      //   this.setState(({ litresFilled }) => ({
      //     litresFilled: acceptNumber(e.target.value, litresFilled)
      //   }));
      //   break;
      // }

      default:
        this.setState(() => ({
          [e.target.name]: e.target.value,
        }));
        break;
    }
  };

  handleDateSelect = (newDate: Date): void => {
    this.setState(() => ({ selectedDate: newDate }));
  };

  getInputClassNames(inputName: string): string {
    return style.form__input;
  }

  render() {
    const { litresFilled, totalCarMileage, refillingPrice, selectedDate } = this.state;

    return (
      <form action="#" onSubmit={this.submit}>
        <label htmlFor="litresFilled" class={style.form__label}>
          How much litres did you fill?
        </label>
        <input
          type="tel"
          name="litresFilled"
          id="litresFilled"
          value={litresFilled || ""}
          class={this.getInputClassNames("litresFilled")}
          onKeyDown={this.handleInputChange}
        />

        <label htmlFor="refillingDate" class={style.form__label}>
          Date of last refilling
        </label>
        <input
          type="text"
          name="refillingDate"
          id="refillingDate"
          value={this.formatDate(selectedDate)}
          class={this.getInputClassNames("refillingDate")}
          onKeyDown={this.handleInputChange}
        />

        <DatePicker isOpen initialDate={selectedDate} onDateSelect={this.handleDateSelect} />

        <label htmlFor="totalCarMileage" class={style.form__label}>
          Total car milage (km)
        </label>
        <input
          type="tel"
          name="totalCarMileage"
          id="totalCarMileage"
          value={totalCarMileage || ""}
          class={this.getInputClassNames("totalCarMileage")}
          onKeyDown={this.handleInputChange}
        />

        <label htmlFor="refillingPrice" class={style.form__label}>
          Fuel price (UAH)
        </label>
        <input
          type="tel"
          name="refillingPrice"
          id="refillingPrice"
          value={refillingPrice || ""}
          class={this.getInputClassNames("refillingPrice")}
          onKeyDown={this.handleInputChange}
        />

        <button type="submit" class={style.form__submit}>
          Add new record
        </button>
      </form>
    );
  }
}
