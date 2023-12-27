import React, { Component } from "react";
import { connect } from "react-redux";
// import "./About.scss";
// import Slider from "react-slick";
// import "../HomePage.scss";

class About extends Component {
  render() {
    return (
      <>
        <div className="section-share section-about">
          <div className="section-about-header">
            Truyền thông nói gì về Bookingcare
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="500"
                height="300"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
