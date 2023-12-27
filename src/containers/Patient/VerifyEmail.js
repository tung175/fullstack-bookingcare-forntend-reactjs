import React, { Component } from "react";
import { connect } from "react-redux";
import "./VerifyEmail.scss";
import { postVerifyBookAppointmentService } from "../../services/userService";
import HomeHeader from '../HomePage/HomeHeader'
import { FormattedMessage } from "react-intl";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
        let urlParams = new URLSearchParams(this.props.location.search)
        let token = urlParams.get('token')
        let doctorId = urlParams.get('doctorId')
        let res = await postVerifyBookAppointmentService({
            token: token,
            doctorId: doctorId
        })
        // console.log("check res clinet", res);

        if (res && res.errCode === 0) {
            this.setState({
                statusVerify: true,
                errCode: res.errCode
            })
        } else {
            this.setState({
                statusVerify: true,
                errCode: res && res.errCode ? res.errCode : -1
            })
        }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
   if (this.props.language !== prevProps.language) {
    
   }
  }

  render() {
    let {statusVerify, errCode} = this.state
    // console.log("check state:", this.state);
    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
            {statusVerify === false ?
            <div>Loading data...</div>
            :
            <div>
                {+errCode === 0 ?
                <div className="infor-booking">Appointment confirmed successfully</div> 
                :
                <div className="infor-booking">Appointment does not exist or has been confirmed</div>}
            </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
