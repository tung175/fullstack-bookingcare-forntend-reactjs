import React, { Component } from "react";
import { connect } from "react-redux";
// import "./ListPatientConfirm.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { Table } from "reactstrap";

class ListPatientConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}
  
  render() {
    return (
      <>
        <div className="manage-patient-container">
          <div className="m-p-title">
            <FormattedMessage id="admin.manage-patient.manage-patient-schedule" />
          </div>
          <div className="manage-patient-body row">
            <div className="col-12 table-manage-patient"></div>
          </div>
        </div>
        <div className="col-12 table-manage-patient">
          <Table bordered borderless hover striped>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPatientConfirm);
