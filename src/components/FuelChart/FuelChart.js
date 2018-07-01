// @flow
import React, { PureComponent } from "react";

import type { Records } from "../lib/types/Records";

type FuelChartProps = {
  records: Records,
};

class FuelChart extends PureComponent<FuelChartProps> {
  render() {
    console.log(this.props);
    return null;
  }
}

export default FuelChart;
