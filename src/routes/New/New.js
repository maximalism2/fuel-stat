// @flow
import { h, Component } from "preact";

import NewRecordForm from "../../components/NewRecordForm/NewRecordForm";
import { getSnapshot, getRecordsRef } from "../../lib/firebase.helpers";

import style from "./style.css";

// TODO: add flow annotation for this route
export default class New extends Component<mixed> {
  recordsDataRef = null;

  componentDidMount() {
    const { userData } = this.props;
    if (!userData) {
      return;
    }

    this.recordsDataRef = getRecordsRef(userData.uid);

    getSnapshot().then(data => {
      console.log({ data: data.val() });
    });
  }

  submit = fields => {
    const newRecord = this.recordsDataRef.push();
    console.log(newRecord.set(fields));
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
