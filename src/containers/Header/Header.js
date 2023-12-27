import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGE, USER_ROLE } from "../../utils";
import _ from 'lodash'
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuApps: []
    }
  }

  handleChangeLanguages = (language) => {
    this.props.changeLanguageAppRedux(language);
  }

  componentDidMount() {
    let {userInfo} = this.props
    let menu = []
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu
      }
    }

    this.setState({
      menuApps: menu
    })
  }
  render() {
    const { processLogout, language, userInfo } = this.props;
    // let languages = this.props.language
    // console.log(this.props);
    // console.log("check userinfo", userInfo);

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApps} />
        </div>

        <div className="languages">
        <span className="welcome"><FormattedMessage id="home-header.welcome"/> {userInfo && userInfo.firstName && language === LANGUAGE.VI ? userInfo.lastName :  userInfo.firstName } !</span>
          <span className={language === LANGUAGE.VI ? "languages-vi active" : "languages-vi"}
          onClick={() => this.handleChangeLanguages(LANGUAGE.VI)}>VN</span>
          <span className={language === LANGUAGE.EN ? "languages-en active" : "languages-en"}
          onClick={() => this.handleChangeLanguages(LANGUAGE.EN)}>EN</span>
          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
