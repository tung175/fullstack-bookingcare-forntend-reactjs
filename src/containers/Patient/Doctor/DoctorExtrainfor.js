import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtrainfor.scss";
import { getExtraInforDoctorByIdService } from "../../../services/userService";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../../utils";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent){
      let res = await getExtraInforDoctorByIdService(this.props.doctorIdFromParent)
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data
        })
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorByIdService(
        this.props.doctorIdFromParent
      );
    //   console.log("check res extra: ", res);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    // console.log("check state extra", this.state);
    return (
      <>
        <div className="doctor-extra-infor-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage id="patient.extra-infor-doctor.text-address" />
            </div>
            <div className="name-clinic">
              {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
            </div>
            <div className="detail-address">
              {extraInfor && extraInfor.addressClinic
                ? extraInfor.addressClinic
                : ""}
            </div>
          </div>
          <div className="content-down">
            {isShowDetailInfor === false && (
              <div className="short-infor">
                <FormattedMessage id="patient.extra-infor-doctor.price" />
                {extraInfor &&
                  extraInfor.priceData &&
                  language === LANGUAGE.VI && (
                    <NumberFormat
                      className="currency"
                      value={extraInfor.priceData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"VND"}
                    />
                  )}
                {/* <FormattedMessage id="patient.extra-infor-doctor.price" /> */}
                {extraInfor &&
                  extraInfor.priceData &&
                  language === LANGUAGE.EN && (
                    <NumberFormat
                      className="currency"
                      value={extraInfor.priceData.valueEn}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"$"}
                    />
                  )}
                <span className="more" onClick={() => this.showHideDetailInfor(true)}>
                  <FormattedMessage id="patient.extra-infor-doctor.detail" />
                </span>
              </div>
            )}

            {isShowDetailInfor === true && (
              <>
                <div className="title-price">
                  <FormattedMessage id="patient.extra-infor-doctor.price" />
                </div>
                <div className="detail-infor">
                  <div className="price">
                    <span className="left">
                      <FormattedMessage id="patient.extra-infor-doctor.price" />
                    </span>
                    <span className="right">
                      {extraInfor &&
                        extraInfor.priceData &&
                        language === LANGUAGE.VI && (
                          <NumberFormat
                            className="currency"
                            value={extraInfor.priceData.valueVi}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"VND"}
                          />
                        )}

                      {extraInfor &&
                        extraInfor.priceData &&
                        language === LANGUAGE.EN && (
                          <NumberFormat
                            className="currency"
                            value={extraInfor.priceData.valueEn}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"$"}
                          />
                        )}
                    </span>
                  </div>
                  <div className="note">
                    {extraInfor && extraInfor.note ? extraInfor.note : ""}
                  </div>
                </div>
                <div className="payment">
                  <FormattedMessage id="patient.extra-infor-doctor.payment" />
                  {extraInfor &&
                  extraInfor.paymentData &&
                  language === LANGUAGE.VI
                    ? extraInfor.paymentData.valueVi
                    : ""}
                  {extraInfor &&
                  extraInfor.paymentData &&
                  language === LANGUAGE.EN
                    ? extraInfor.paymentData.valueEn
                    : ""}
                </div>
                <div className="hide-price">
                  <span onClick={() => this.showHideDetailInfor(false)}>
                    <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                  </span>
                </div>
              </>
            )}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
