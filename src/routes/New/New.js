// @flow
import { h, Component } from "preact";

import NewRecordForm from "../../components/NewRecordForm/NewRecordForm";
import { getSnapshot, getRecordsRef } from "../../lib/firebase.helpers";

import style from "./style";

export default class New extends Component {
  recordsDataRef = null;

  async componentDidMount() {
    const { userData } = this.props;
    if (!userData) {
      return;
    }

    this.recordsDataRef = getRecordsRef(userData.uid);

    const data = await getSnapshot();
    console.log({ data: data.val() });
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
