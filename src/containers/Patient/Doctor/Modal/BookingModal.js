import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "react-flatpickr";
import * as actions from "../../../../store/actions";
import { LANGUAGE } from "../../../../utils";
import Select from "react-select";
import { toast } from "react-toastify";
import { postBookAppointmentService } from "../../../../services/userService";
import { FormattedMessage } from "react-intl";
import moment from "moment";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      selectedGender: "",
      address: "",
      reason: "",
      birthday: "",
      doctorId: "",
      genders: "",
      timeType: "",
    };
  }

  async componentDidMount() {
    this.props.getGendersRedux();
  }

  buildDataGenders = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGE.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGenders(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGenders(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleOnchangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };

  buildTimeBooking = (dataTime) => {
    let {language} = this.props
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = language === this.props.LANGUAGE.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

      let date = language === LANGUAGE.Vi ? 
            moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            :
            moment.unix(+dataTime.date / 1000).local('en').format('ddd - DD/MM/YYYY')
    return `${time} ${date}`
    }
    return ''
  }

  buildDoctorName = (dataTime) => {
    let {language} = this.props
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = language === LANGUAGE.Vi ? 
            `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            :
            `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`

    return name
  }
    return ''
  }

  handleConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime)
    let doctorName = this.buildDoctorName(this.props.dataTime)
    let res = await postBookAppointmentService({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      selectedGender: this.state.selectedGender.value,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      doctorId: this.state.doctorId,
      // genders: this.state.genders,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName
    });
    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeeded!");
      this.props.closeBookingClose();
    } else {
      toast.error("Booking a new appointment error!");
    }
  };

  render() {
    let { isOpenModalBooking, closeBookingClose, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    console.log("check data time", dataTime);
    return (
      <>
        <Modal
          isOpen={isOpenModalBooking}
          className={"booking-modal-container"}
          size="lg"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id="patient.booking-modal.title" />
              </span>
              <span className="right" onClick={closeBookingClose}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor-infor">
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowDescriptionDoctor={false}
                  dataTime={dataTime}
                />
              </div>
              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.fullName" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.fullName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "fullName")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "phoneNumber")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.email" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "email")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.address" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                  />
                </div>

                <div className="col-12 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.reason" />
                  </label>
                  <input
                    className="form-control"
                    value={this.state.reason}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "reason")
                    }
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.birthday" />
                  </label>
                  <DatePicker
                    className="form-control"
                    value={this.state.birthday}
                    onChange={this.handleOnChangeDatePicker}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.gender" />
                  </label>
                  <Select
                    // className="form-control"
                    value={this.state.selectedGender}
                    onChange={this.handleOnchangeSelect}
                    options={this.state.genders}
                placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>}

                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-booking-confirm"
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id="patient.booking-modal.btnConfirm" />
              </button>
              <button
                className="btn-booking-cancel"
                onClick={closeBookingClose}
              >
                <FormattedMessage id="patient.booking-modal.btnCancel" />
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGendersRedux: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
