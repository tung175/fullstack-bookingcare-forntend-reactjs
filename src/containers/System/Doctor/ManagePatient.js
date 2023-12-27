import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { getAllPatientForDoctorService } from "../../../services/userService";
import { LANGUAGE } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import { postSendRemedyService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { Table } from "reactstrap";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
    // console.log("check props", this.props.user.id);
    // let {user} = this.props
    // let {currentDate}= this.state
    // let formattedDate = new Date(currentDate).getTime()
    // this.getDataPatient(user, formattedDate)
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctorService({
      doctorId: user.id,
      date: formattedDate,
    });

    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };

    // console.log(data);
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    // console.log("check datachild", dataChild);
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedyService({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    // console.log(res);
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("send remedy succeeds");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Something wrongs ...");
      console.log("check res", res);
    }
  };
  render() {
    // console.log("check state patient", this.state);
    let { dataPatient, isOpenRemedyModal, isShowLoading, dataModal } =
      this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay active={isShowLoading} spinner text="Loading ....">
          <div className="manage-patient-container">
            <div className="m-p-title">
              <FormattedMessage id="admin.manage-patient.manage-patient-schedule" />
            </div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="admin.manage-patient.choose-date" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient"></div>
            </div>
          </div>
          <div className="col-12 table-manage-patient">
            <Table bordered hover responsive size="">
              <thead style={{ width: "100%" }}>
                <tr>
                  <th>
                    <FormattedMessage id="admin.manage-patient.id" />
                  </th>
                  <th>
                    <FormattedMessage id="admin.manage-patient.time" />
                  </th>
                  <th>
                    <FormattedMessage id="admin.manage-patient.fullName" />
                  </th>
                  <th>
                    <FormattedMessage id="admin.manage-patient.address" />
                  </th>
                  <th>
                    <FormattedMessage id="admin.manage-patient.gender" />
                  </th>
                  <th>
                    <FormattedMessage id="admin.manage-patient.actions" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient.map((item, index) => {
                    let time =
                      language === LANGUAGE.VI
                        ? item.timeTypeDataPatient.valueVi
                        : item.timeTypeDataPatient.valueEn;
                    let gender =
                      language === LANGUAGE.VI
                        ? item.patientData.genderData.valueVi
                        : item.patientData.genderData.valueEn;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{time}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.address}</td>
                        <td>{gender}</td>
                        <td>
                          <button
                            className="mp-btn-confirm"
                            onClick={() => this.handleBtnConfirm(item)}
                          >
                            <FormattedMessage id="admin.manage-patient.btn-confirm" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      <FormattedMessage id="admin.manage-patient.noData" />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <RemedyModal
              isOpenModal={isOpenRemedyModal}
              dataModal={dataModal}
              closeRemedyModal={this.closeRemedyModal}
              sendRemedy={this.sendRemedy}
            />
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
