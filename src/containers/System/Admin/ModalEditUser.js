import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import "./ModalEditUser.scss";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CRUD_ACTION, CommonUtils, LANGUAGE } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import _ from "lodash"
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      rolesArr: [],
      positionArr: [],
      previewImgUrl: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      avatar: "",
      position: "",
      role: "",
      action: "",
      userEditId: "",
    };
  }
  

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
    this.props.getPositionStart();
    let user = this.props.currentUser
    if (user && !_.isEmpty(user)) {
        let imageBase64 = '';
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary')
    }
    // console.log('data from parent', user);
    this.setState({
      email: user.email,
      password: "hardcode",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      // avatar: user.avatar,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      avatar: '',
      previewImgUrl: imageBase64,
      action: CRUD_ACTION.EDIT,
      userEditId: user.id
    });
    }

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        rolesArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (prevProps.listUser !== this.props.listUser) {
      let arrPosition = this.props.positionRedux;
      let arrRole = this.props.roleRedux;
      let arrGenders = this.props.genderRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        avatar: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        action: CRUD_ACTION.CREATE,
        previewImgUrl: "",
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log(base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: base64,
      });
    } else {
    }
    // console.log(objectUrl);
  };

  openPreviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;

    if (action === CRUD_ACTION.CREATE) {
      //fire redux
      this.props.createNewUserRedux({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTION.EDIT) {
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    } else {
    }

    // console.log("check before submit check state ", this.state);
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("pls", arrCheck[i]);
        break;
      }
      return isValid;
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    // console.log('data from parent', user);
    this.setState({
      email: user.email,
      password: "hardcode",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      // avatar: user.avatar,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      avatar: "",
      previewImgUrl: imageBase64,
      action: CRUD_ACTION.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let { isOpenEditUser, handleEditUserClose, language, currentUser } = this.props;
    let {
      genderArr,
      positionArr,
      rolesArr,
      email,
      password,
      address,
      phoneNumber,
      firstName,
      lastName,
      position,
      role,
      avatar,
      gender,
    } = this.state;
    return (
      <>
        <Modal isOpen={isOpenEditUser} size="xl">
          <ModalHeader>Modal title edit</ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <div className="col-12 my-3">
                  {/* <FormattedMessage id="manage-user-redux.add" /> */}
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user-redux.email" />
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(event) => this.onChangeInput(event, "email")}
                    disabled={
                      this.state.action === CRUD_ACTION.EDIT ? true : false
                    }
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user-redux.password" />
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(event) => this.onChangeInput(event, "password")}
                    disabled={
                      this.state.action === CRUD_ACTION.EDIT ? true : false
                    }
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user-redux.first-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={firstName}
                    onChange={(event) => this.onChangeInput(event, "firstName")}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user-redux.last-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={lastName}
                    onChange={(event) => this.onChangeInput(event, "lastName")}
                  />
                </div>
                <div className="col-6">
                  <label>
                    <FormattedMessage id="manage-user-redux.address" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(event) => this.onChangeInput(event, "address")}
                  />
                </div>
                <div className="col-6">
                  <label>
                    <FormattedMessage id="manage-user-redux.phone-number" />
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    value={phoneNumber}
                    onChange={(event) =>
                      this.onChangeInput(event, "phoneNumber")
                    }
                  />
                </div>
                <div className="col-6">
                  <label>
                    <FormattedMessage id="manage-user-redux.gender" />
                  </label>
                  <select
                    id="inputState"
                    className="form-control"
                    onChange={(event) => this.onChangeInput(event, "gender")}
                    value={gender}
                  >
                    {genderArr &&
                      genderArr.length > 0 &&
                      genderArr.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-6">
                  <label>
                    <FormattedMessage id="manage-user-redux.position" />
                  </label>
                  <select
                    id="inputState"
                    className="form-control"
                    onChange={(event) => this.onChangeInput(event, "position")}
                    value={position}
                  >
                    {positionArr &&
                      positionArr.length > 0 &&
                      positionArr.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-6">
                  <label>
                    <FormattedMessage id="manage-user-redux.role" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(event) => this.onChangeInput(event, "role")}
                    value={role}
                  >
                    {rolesArr &&
                      rolesArr.length > 0 &&
                      rolesArr.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGE.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-6">
                  <label>
                    <FormattedMessage id="manage-user-redux.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      Tai anh <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{ background: `url(${this.state.previewImgUrl})` }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                    {this.state.isOpen === true && (
                  <Lightbox
                    mainSrc={this.state.previewImgUrl}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                  />
                )}
                  </div>
                </div>
                
                <div className="col-12 mt-3">
                  {/* <button
                    className={this.state.action === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary"} type="button"
                    onClick={() => this.handleSaveUser()}
                  >
                    {this.state.action === CRUD_ACTION.EDIT ?
                    <FormattedMessage id="manage-user-redux.edit" />
                    :
                    <FormattedMessage id="manage-user-redux.save" />
                    }
                  </button> */}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className={
                this.state.action === CRUD_ACTION.EDIT
                  ? "btn btn-warning"
                  : "btn btn-primary"
              }
              onClick={() => this.handleSaveUser()}
            >
              {this.state.action === CRUD_ACTION.EDIT ? (
                <FormattedMessage id="manage-user-redux.edit" />
              ) : (
                <FormattedMessage id="manage-user-redux.save" />
              )}
            </Button>{" "}
            <Button color="secondary" onClick={handleEditUserClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.position,
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //admin
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    //position
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    //role
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    //create
    createNewUserRedux: (data) => dispatch(actions.createNewUser(data)),
    //fetch user
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    //edit
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
