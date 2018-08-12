// @flow
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";

import AddRecordButton from "../../components/AddRecordButton/AddRecordButton";
import FuelChart from "../../components/FuelChart/FuelChart";
import MainStat from "../../components/MainStat/MainStat";
import { getSnapshot } from "../../lib/firebase.helpers";
import { loadRecords } from "../../actions/records";

import type { Store } from "../../lib/types/Store";
import type { LoadRecords } from "../../actions/records";
import type { Dispatcher } from "../../lib/types/common";
import type { RecordsData, RecordsState } from "../../lib/types/Records";

import styles from "./style.css";
import spinner from "../../assets/icons/spinner_grey.svg";

type HomeProps = {
  loadRecords: LoadRecords,
  recordsData: RecordsData,
  recordsState: RecordsState,
  userId: ?string,
};

type HomeState = {};

class Home extends Component<HomeProps, HomeState> {
  componentDidMount() {
    if (this.props.userId) {
      this.props.loadRecords(this.props.userId);
    }
  }

  render() {
    const { recordsState, recordsData } = this.props;
    const areRecordsExist = recordsData.ids.length > 0;

    const spinnerWrapperCN = classnames(styles.home__spinnerWrapper, {
      [styles.home__spinnerWrapper_update]: areRecordsExist,
    });

    const spinnerCN = classnames(styles.home__spinner, {
      [styles.home__spinner_update]: areRecordsExist,
    });

    return (
      <section class={styles.home}>
        <AddRecordButton />

        {recordsState.loading && (
          <div class={spinnerWrapperCN}>
            <img src={spinner} class={spinnerCN} />
          </div>
        )}

        {areRecordsExist && <MainStat records={recordsData.records} />}

        {/* {areRecordsExist && <FuelChart records={recordsData.records} />} */}
      </section>
    );
  }
}

const mapStateToProps = ({ auth, records }: Store, ownProps: HomeProps): HomeProps => {
  const { userData } = auth;

  return {
    ...ownProps,
    userId: userData ? userData.uid : null,
    recordsData: records.data,
    recordsState: records.state,
  };
};

const mapDispatchToProps = (dispatch: Dispatcher, ownProps: HomeProps): HomeProps => {
  const actionCreators = {
    loadRecords,
  };

  return {
    ...ownProps,
    ...bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
