// @flow
import { h, Component } from "preact";
import moment from "moment";

import { getSnapshot, getRecordsRef } from "../../lib/firebase.helpers";
// import { acceptNumber } from "./New.helpers";

import style from "./style.css";

type NewRecrodFormProps = {
  loading: boolean,
  onSubmit: (fields: NewRecrodFormState) => void
};

type NewRecrodFormState = {
  litresFilled: number,
  refillingDate: string,
  totalCarMileage: number,
  refillingPrice: number
};

export default class New extends Component {
  recordsDataRef = null;

  state: NewRecrodFormState = {
    litresFilled: 0,
    refillingDate: this.formatDate(new Date()),
    totalCarMileage: 0,
    refillingPrice: 0
  };

  formatDate(date: Date): string {
    return moment(date).format("LL");
  }

  submit = (e: Event<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    this.props.onSubmit(this.state);
  };

  handleInputChange = (e: Event<HTMLInputElement>) => {
    switch (e.target.name) {
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
          [e.target.name]: e.target.value
        }));
        break;
    }
  };

  getInputClassNames(inputName: string): string {
    return style.form__input;
  }

  render(props: NewRecrodFormProps, state: NewRouteState) {
    return (
      <form action="#" onSubmit={this.submit}>
        <label htmlFor="litresFilled" class={style.form__label}>
          How much litres did you fill?
        </label>
        <input
          type="tel"
          name="litresFilled"
          id="litresFilled"
          placeholder="E.G.: 18.4"
          value={state.litresFilled || ""}
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
          value={state.refillingDate}
          placeholder={this.formatDate(new Date())}
          class={this.getInputClassNames("refillingDate")}
          onKeyDown={this.handleInputChange}
        />

        <label htmlFor="totalCarMileage" class={style.form__label}>
          Total car milage (km)
        </label>
        <input
          type="tel"
          name="totalCarMileage"
          id="totalCarMileage"
          value={state.totalCarMileage || ""}
          placeholder="E.G.: 18732"
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
          value={state.refillingPrice || ""}
          placeholder="E.G: 356"
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
