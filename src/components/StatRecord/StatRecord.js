// @flow
import React, { PureComponent } from "react";

import styles from "./StatRecord.css";

type StatRecordProps = {
  value: string,
  dimension: string,
  tagName?: string,
};

class StatRecord extends PureComponent<StatRecordProps> {
  static defaultProps = {
    tagName: "p",
  };

  render() {
    const { tagName, dimension, value } = this.props;

    const Tag = tagName ? tagName : StatRecord.defaultProps.tagName;
    return (
      <Tag class={styles.statRecord__mainNumber}>
        <p class={styles.statRecord__animatedNumber}>{value}</p>
        <span class={styles.statRecord__dimensions}>{dimension}</span>
      </Tag>
    );
  }
}

export default StatRecord;
