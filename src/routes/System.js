import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
// import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import ManageClinic from "../containers/System/Clinic/ManageClinic";
import ManageHandbook from "../containers/System/Handbook/ManageHandbook";
import TableManagerUser from "../containers/System/Admin/TableManagerUser";
import TableClinic from "../containers/System/Clinic/TableClinic"
import TableHandbook from "../containers/System/Handbook/TableHandbook";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <>
      {this.props.isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={TableManagerUser} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-doctor" component={ManageDoctor}/>
              <Route path="/system/manage-specialty" component={ManageSpecialty}/>
              <Route path="/system/list-specialty" component={TableHandbook}/>
              <Route path="/system/manage-clinic" component={ManageClinic}/>
              <Route path="/system/list-clinic" component={TableClinic}/>
              <Route path="/system/manage-handbook" component={ManageHandbook}/>
              <Route path="/system/list-handbook" component={TableHandbook}/>
              {/* <Route
                path="/system/register-package-group-or-account"
                component={RegisterPackageGroupOrAcc}
              /> */}
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
