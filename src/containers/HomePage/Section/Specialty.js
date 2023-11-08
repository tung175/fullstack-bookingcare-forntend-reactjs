import React, { Component } from "react";
import { connect } from "react-redux";
import "./specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// import '../HomePage.scss'

class Specialty extends Component {
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
    return (
      <>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Chuyên khoa phổ biến</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize">
                  <div className="bg-imge section-specialty"/>
                  <div>Cơ xương khớp</div>
                </div>
                <div className="section-customize">
                  <div className="bg-imge section-specialty"/>
                  <div>Cơ xương khớp</div>
                </div>
                <div className="section-customize">
                  <div className="bg-imge section-specialty"/>
                  <div>Cơ xương khớp</div>
                </div>
                <div className="section-customize">
                  <div className="bg-imge section-specialty"/>
                  <div>Cơ xương khớp</div>
                </div>
                <div className="section-customize">
                  <div className="bg-imge section-specialty"/>
                  <div>Cơ xương khớp</div>
                </div>
                <div className="section-customize">
                  <div className="bg-imge section-specialty"/>
                  <div>Cơ xương khớp</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
