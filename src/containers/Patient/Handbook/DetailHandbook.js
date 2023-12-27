import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailHandbook.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorExtrainfor from "../Doctor/DoctorExtrainfor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import _ from "lodash";
import { LANGUAGE } from "../../../utils";
import {
  getAllCodeService,
  getAllDetailHandbookByIdService,
} from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { Button, Fade } from "reactstrap";
class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // arrDoctorId: [],
      dataDetailHandbook: {},
      listProvince: [],
      isOpen: false,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllDetailHandbookByIdService({
        id: id,
      });

      // console.log("check res detail specialty", res);
      // console.log("check res province", resProvince);

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailHandbook: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeSelect = async (event) => {
    // console.log("check onChange", event.target.value);
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      // let location = event.target.value
      // console.log("check id and location", id, location);
      let res = await getAllDetailHandbookByIdService({
        id: id,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailHandbook: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  handleOpenMore = () => {
    this.setState({
      isOpen: true,
    });
  };
  render() {
    let { dataDetailHandbook, isOpen } = this.state;
    // console.log("check state detail specialty", this.state);
    let { language } = this.props;
    return (
      <>
        <div className="detail-specialty-container">
          <HomeHeader isShowBanner={false} />
          <div className="home-header-banner detail-handbook-banner">
            <div className="content-up content-up-handbook">
              <div className="title2">{dataDetailHandbook.name}</div>
            </div>
          </div>
          <div className="detail-specialty-body">
            <div className="description-specialty">
              {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailHandbook.descriptionHTML,
                  }}
                ></div>
              )}
              {!isOpen && (
                <Button
                  onClick={() => this.handleOpenMore()}
                  aria-controls="example-fade-text"
                  aria-expanded={isOpen}
                  className="btn-read-more"
                >
                  mo them
                </Button>
              )}
              <Fade in={isOpen}>
                <div id="example-fade-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </div>
              </Fade>
            </div>
            {/* {arrDoctorId && arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor" key={index}>
                    <div className="dt-content-left">
                      <div className="profile-doctor">
                        <ProfileDoctor 
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                        />
                      </div>
                    </div>
                    <div className="dt-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule 
                        doctorIdFromParent={item}/>
                      </div>
                      <div className="doctor-extra-infor">
                        <DoctorExtrainfor 
                        doctorIdFromParent={item}/>
                      </div>
                    </div>
                  </div>
                )
              })} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
