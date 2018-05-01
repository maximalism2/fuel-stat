// @flow
import { h, Component } from "preact";
import { Link } from "preact-router";

import style from "./style.css";

export default () => (
  <Link class={style.addRecordButton} href="/new">
    Add record
  </Link>
);
