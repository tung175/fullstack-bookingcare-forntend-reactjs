import React, { Component } from "react";
import { connect } from "react-redux";
import "./specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialtyService } from "../../../services/userService";
import { withRouter } from "react-router";
// import '../HomePage.scss'

class Specialty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSpecialty: []
    }
  }

  async componentDidMount() {
    let res = await getAllSpecialtyService()
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : []
      })
    } 
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`)
    }
  }
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />
    };

    let {dataSpecialty} = this.state
    return (
      <>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.specialty-popular"/>
              </span>
              <button className="btn-section"><FormattedMessage id="homepage.more-infor"/></button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataSpecialty && dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return(
                      <div className="section-customize specialty-child" key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                        <div className="bg-imge section-specialty" style={{backgroundImage: `url(${item.image})`}}/>
                        <div className="specialty-name">{item.name}</div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
