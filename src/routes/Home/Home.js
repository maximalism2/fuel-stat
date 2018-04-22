import { h, Component } from "preact";

import AddRecordButton from "../../components/AddRecordButton/AddRecordButton";
import { getSnapshot } from "../../lib/firebase.helpers";

import gasPumpIcon from "../../assets/gas-pump.svg";
import style from "./style";

export default class Home extends Component {
  state = {
    data: ""
  };

  async componentDidMount() {
    const { userData } = this.props;
    if (!userData || !userData.uid) {
      return;
    }

    const data = await getSnapshot();

    console.log(JSON.stringify(data.val()));
    this.setState(() => ({ data: JSON.stringify(data.val()) }));
  }

  render(props: mixed, state: mixed) {
    return (
      <section class={style.home}>
        <AddRecordButton />
        <h1>Home</h1>
        <code>{state.data}</code>
      </section>
    );
  }
}
