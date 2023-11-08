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
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/DujM57DP4u4"
                title="Điều kì diệu của việc đ* quan tâm"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content-right">
                lorem  
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
