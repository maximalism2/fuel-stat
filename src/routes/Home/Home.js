import { h, Component } from "preact";

import AddRecordButton from "../../components/AddRecordButton/AddRecordButton";

import gasPumpIcon from "../../assets/gas-pump.svg";
import style from "./style";

export default props => {
  return (
    <section class={style.home}>
      <AddRecordButton />
      <h1>Home</h1>
    </section>
  );
};
