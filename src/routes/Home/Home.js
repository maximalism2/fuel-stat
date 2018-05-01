import React, { Component } from "react";

import AddRecordButton from "../../components/AddRecordButton/AddRecordButton";
import { getSnapshot } from "../../lib/firebase.helpers";

import gasPumpIcon from "../../assets/gas-pump.svg";
import style from "./style.css";

export default class Home extends Component {
  state = {
    data: ""
  };

  componentDidMount() {
    const { userData } = this.props;
    if (!userData || !userData.uid) {
      return;
    }

    getSnapshot().then(data => {
      this.setState(() => ({ data: JSON.stringify(data.val()) }));
    });
  }

  render(props: mixed, state: mixed) {
    return (
      <section class={style.home}>
        <AddRecordButton />
        <h1>Home</h1>
        <img src={gasPumpIcon} class={style.home__icon} />
        <code>{state.data}</code>
      </section>
    );
  }
}
