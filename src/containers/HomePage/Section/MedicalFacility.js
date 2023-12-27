import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
// import "../HomePage.scss";
import { withRouter } from "react-router";
import { iteratee } from "lodash";
import {getAllClinicService} from '../../../services/userService'
import { FormattedMessage } from "react-intl";
class MedicalFacility extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataClinic: []
    }
  }

  async componentDidMount() {
    let res = await getAllClinicService()
    // console.log('check res clinci', res);
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : []
      })
    }
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`detail-clinic/${clinic.id}`)
    }
  }
  render() {
    let {dataClinic} = this.state
    // console.log("check data clinic", dataClinic);
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section"><FormattedMessage id="homepage.clinic"/></span>
              <button className="btn-section"><FormattedMessage id="homepage.more-infor"/></button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataClinic && dataClinic.length > 0 &&
                  dataClinic.map((item, index) => {
                    return(
                      <div className="section-customize clinic-child" key={index} onClick={() => this.handleViewDetailClinic(item)}>
                        <div className="bg-imge section-medical-facility" style={{backgroundImage: `url(${item.image})`}}/>
                        <div >{item.name}</div>
                      </div>
                    )
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
