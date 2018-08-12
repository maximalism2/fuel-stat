// @flow
import React from "react";

import StatRecord from "../StatRecord/StatRecord";
import { type MainStatProps, getTotalLitres, getTrackedMilage } from "./MainStat.helpers";
import type { Records } from "../../lib/types/Records";

import styles from "./MainStat.css";

class MainStat extends React.PureComponent<MainStatProps> {
  getAverageValue = (records?: Records = {}): number => getTotalLitres(records) / getTrackedMilage(records);

  render() {
    const { records } = this.props;

    return (
      <section class={styles.mainStat}>
        <StatRecord tagName="h2" value={this.getAverageValue(records).toFixed(2)} dimension={"L/100KM"} />

        <div class={styles.mainStat__statTable}>
          <div class={styles.mainStat__statCell} />
        </div>
      </section>
    );
  }
}

export default MainStat;
