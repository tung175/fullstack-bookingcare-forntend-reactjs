import React, { Component } from "react";
import { connect } from "react-redux";
// import "./HomeFooter.scss";
// import Slider from "react-slick";
// import "../HomePage.scss";

class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className="home-footer">
          <p>
            &copy; 2023 Kyu Tùng. More information, please visit my website
            <a href="#" target="_blank">
              <> </>Click here
            </a>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
