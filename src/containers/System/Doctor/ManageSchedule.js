import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss"
import { FormattedMessage } from "react-intl";
import Select from 'react-select'
import * as actions from '../../../store/actions'
import { CRUD_ACTION, LANGUAGE, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import  _  from "lodash";
import {  toast } from "react-toastify";
import {saveBulkScheduleDoctor} from '../../../services/userService'

class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: moment(new Date()).startOf("day").valueOf(),
            rangeTime: [],
            minDate: moment().subtract(1, 'days')
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux()
        this.props.fetchAllScheduleTimeRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item, isSelected: false
                }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = []
        let {language} = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
        }

        return result
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0 ) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected
                }
                return item
            })

            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let {rangeTime, selectedDoctor, currentDate} = this.state
        let result = []

        if (!currentDate) {
            toast.error("Invalid date!")
            return
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor")
            return
        }

        // let formateDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formateDate = new Date(currentDate).getTime()

        if(rangeTime && rangeTime.length > 0)
        {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formateDate
                    object.timeType = schedule.keyMap
                    result.push(object)
                })
            } else {
                toast.error("Invalid selected time!")
                return
            }
        }
        // console.log("check result", result);

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formateDate: formateDate
        })

        if (res && res.errCode === 0) {
            toast.success("Save Infor success")
        } else {
            toast.error("Error saveBulkScheduleDoctor")
        }
        console.log("check res:saveBulkScheduleDoctor", res);
    }
  render() {
//    console.log('check state: ', this.state);
   let {rangeTime, currentDate} = this.state
   let {language} = this.props
   let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    return (
      <>
        <div className="manage-schedule-container">
            <div className="m-s-title">
                <FormattedMessage id="manage-schedule.title"/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6 form-group">
                        <label> <FormattedMessage id="manage-schedule.choose-doctor" /></label>
                        <Select
                            value = {this.state.selectedDoctor}
                            onChange = {this.handleChangeSelect}
                            options = {this.state.listDoctors}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label> <FormattedMessage id="manage-schedule.choose-date" /></label>
                        <DatePicker
                            onChange = {this.handleOnChangeDatePicker}
                            // options = {this.state.listDoctors}
                            className = "form-control"
                            minDate = {yesterday}
                            value={currentDate}
                        />
                    </div>
                    <div className="col-12 pick-hour-container">
                        {rangeTime && rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return(
                                    <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"} 
                                    key={index}
                                    onClick={() => this.handleClickBtnTime(item)}
                                    >
                                        {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                    </button>
                                )
                            })}
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary btn-save-schedule"
                        onClick={() => this.handleSaveSchedule()}>
                            <FormattedMessage id="manage-schedule.save"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.app.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
