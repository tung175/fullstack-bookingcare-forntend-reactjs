import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
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
            &copy; <FormattedMessage id="homepage.license"/>
            <a href="#" target="_blank">
              <> </><FormattedMessage id="homepage.click"/>
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
