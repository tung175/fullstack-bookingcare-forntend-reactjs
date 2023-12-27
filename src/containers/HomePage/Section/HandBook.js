import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import "./HandBook.scss";
import Slider from "react-slick";
import { getAllHandbookService } from "../../../services/userService";
import { withRouter } from "react-router";
// import "../HomePage.scss";

class HandBook extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataHandbook: []
    }
  }
  async componentDidMount() {
    let res = await getAllHandbookService()
    // console.log('check res handbook', res);
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : []
      })
    }
  }

  handleViewDetailHandbook = (handbook) => {
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${handbook.id}`)
    }
  }

  
  render() {
    let {dataHandbook} = this.state
    return (
      <>
        <div className="section-share section-handbook">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section"><FormattedMessage id="homepage.handBook"/></span>
              <button className="btn-section"><FormattedMessage id="homepage.more-infor"/></button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataHandbook && dataHandbook.length > 0 &&
                  dataHandbook.map((item, index) => {
                    return(
                      <div className="section-customize clinic-child"  key={index} onClick={() => this.handleViewDetailHandbook(item)}>
                        <div className="bg-imge section-medical-facility" style={{backgroundImage: `url(${item.image})`}}/>
                        <div style={{width: "93%"}}>{item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
