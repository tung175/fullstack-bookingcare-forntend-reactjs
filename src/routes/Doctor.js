import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageSchedule from '../containers/System/Doctor/ManageSchedule'
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import ListPatientConfirm from "../containers/System/Doctor/ListPatientConfirm";

class Doctor extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <>
      {this.props.isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/doctor/manage-schedule" component={ManageSchedule} />
              <Route path="/doctor/manage-patient" component={ManagePatient} />     
              <Route path="/doctor/list-patient-confirm" component={ListPatientConfirm} />     
              
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
