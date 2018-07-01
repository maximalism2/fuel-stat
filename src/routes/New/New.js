// @flow
import React, { Component } from "react";

import NewRecordForm from "../../components/NewRecordForm/NewRecordForm";
import { getSnapshot, getRecordsRef } from "../../lib/firebase.helpers";

import style from "./style.css";

// TODO: add flow annotation for this route
export default class New extends Component<mixed> {
  recordsDataRef = null;

  componentDidMount() {
    // const { userData } = this.props;
    // if (!userData) {
    //   return;
    // }

    this.recordsDataRef = getRecordsRef();

    getSnapshot().then(data => {
      console.log({ data: data.val() });
    });
  }

  submit = fields => {
    const newRecord = this.recordsDataRef
      .push({
        ownerId: "qsDi4TcoomYeN0dGF8jG2n6s4L03",
        ...fields,
      })
      .then(res => {
        console.log(res);
      });
    // newRecord
    //   .set()
    //   .then(res => console.log({ res }));
  };

  render(props: mixed, state: mixed) {
    return (
      <section class={style.new}>
        <h1>Add new record to your fuel stat</h1>
        <NewRecordForm onSubmit={this.submit} loading={state.loading} />
      </section>
    );
  }
}
