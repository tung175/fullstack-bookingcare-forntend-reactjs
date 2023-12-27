import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import "./ModalEditClinic.scss";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CRUD_ACTION, CommonUtils, LANGUAGE } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import _ from "lodash"
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite'
const mdParser = new MarkdownIt
class ModalEditClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      previewImgUrl: "",
      isOpen: false,
      action: "",
    };
  }
  

  async componentDidMount() {
    // this.props.getGenderStart();
    // this.props.getRoleStart();
    // this.props.getPositionStart();
    let clinic = this.props.currentClinic
    if (clinic && !_.isEmpty(clinic)) {
        let imageBase64 = '';
    if (clinic.image) {
      imageBase64 = new Buffer(clinic.image, 'base64').toString('binary')
    }
    // console.log('data from parent', imageBase64);
    this.setState({
      name: clinic.name,
      address: clinic.address,
      imageBase64: imageBase64,
      descriptionHTML: clinic.descriptionHTML,
      descriptionMarkdown: clinic.descriptionMarkdown,
      clinicEditId: clinic.id,
      action: CRUD_ACTION.EDIT,
    });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.genderRedux !== this.props.genderRedux) {
    //   let arrGenders = this.props.genderRedux;
    //   this.setState({
    //     genderArr: arrGenders,
    //     gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
    //   });
    // }
    // if (prevProps.roleRedux !== this.props.roleRedux) {
    //   let arrRole = this.props.roleRedux;
    //   this.setState({
    //     rolesArr: arrRole,
    //     role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
    //   });
    // }
    // if (prevProps.positionRedux !== this.props.positionRedux) {
    //   let arrPosition = this.props.positionRedux;
    //   this.setState({
    //     positionArr: arrPosition,
    //     position:
    //       arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
    //   });
    // }
    // if (prevProps.listUser !== this.props.listUser) {
    //   let arrPosition = this.props.positionRedux;
    //   let arrRole = this.props.roleRedux;
    //   let arrGenders = this.props.genderRedux;
    //   this.setState({
    //     email: "",
    //     password: "",
    //     firstName: "",
    //     lastName: "",
    //     phoneNumber: "",
    //     address: "",
    //     avatar: "",
    //     gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
    //     role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
    //     position:
    //       arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
    //     action: CRUD_ACTION.CREATE,
    //     previewImgUrl: "",
    //   });
    // }
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

  handleSaveUser = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;

    // if (action === CRUD_ACTION.CREATE) {
    //   //fire redux
    //   this.props.createNewUserRedux({
    //     name: this.state.name,
    //     address: this.state.address,
    //     imageBase64: this.state.imageBase64,
    //     descriptionHTML: this.state.descriptionHTML,
    //     descriptionMarkdown: this.state.descriptionMarkdown,
    //   });
    // }
    if (action === CRUD_ACTION.EDIT) {
      // console.log("check action: ", action);
      this.props.editAClinicRedux({
        id: this.state.clinicEditId,
        name: this.state.name,
        address: this.state.address,
        imageBase64: this.state.imageBase64,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
      });
    } else {
    }

    // console.log("check before submit check state ", this.state);
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  // handleEditUserFromParent = (user) => {
  //   let imageBase64 = "";
  //   if (user.image) {
  //     imageBase64 = new Buffer(user.image, "base64").toString("binary");
  //   }
  //   // console.log('data from parent', user);
  //   this.setState({
  //     email: user.email,
  //     password: "hardcode",
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     phoneNumber: user.phoneNumber,
  //     address: user.address,
  //     // avatar: user.avatar,
  //     gender: user.gender,
  //     role: user.roleId,
  //     position: user.positionId,
  //     avatar: "",
  //     previewImgUrl: imageBase64,
  //     action: CRUD_ACTION.EDIT,
  //     userEditId: user.id,
  //   });
  // };
  handleEditorChange = ({html, text}) => {
    this.setState({
        descriptionHTML: html,
        descriptionMarkdown: text
    })
  }

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "name",
      "address",
      "imageBase64",
      "descriptionHTML",
      "descriptionMarkdown",
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

  render() {
    let { isOpenEditClinic, handleEditClinicClose, language, currentUser } = this.props;
    let {
      name,
      address,
      imageBase64,
      descriptionHTML,
      descriptionMarkdown,
      action
    } = this.state;
    // console.log(action);
    return (
      <>
        <Modal isOpen={isOpenEditClinic} size="xl">
          <ModalHeader>Modal title edit</ModalHeader>
          <ModalBody>
          <div className="manage-specialty-container">
            <div className="ms-title"><FormattedMessage id="admin.manage-clinic.title"/></div>
            <div className="add-new-specialty row">
                <div className="col-6 form-group">
                    <label><FormattedMessage id="admin.manage-clinic.name"/></label>
                    <input className="form-control" type="text" value={this.state.name}
                    onChange={(event) => this.onChangeInput(event, 'name')}/>
                </div>
                <div className="col-6 form-group">
                    <label><FormattedMessage id="admin.manage-clinic.image"/></label>
                    <input className="form-control-file" type="file" 
                    onChange={(event) => this.onChangeInput(event)}/>
                </div>
                <div className="col-6 form-group">
                    <label><FormattedMessage id="admin.manage-clinic.address"/></label>
                    <input className="form-control" type="text" value={this.state.address}
                    onChange={(event) => this.onChangeInput(event, 'address')}/>
                </div>
                <div className="col-12">
                    <MdEditor
                        style={{height: '450px'}}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>
                {/* <div className="col-12">
                    <button className="btn-save-specialty"
                    onClick={() => this.handleSaveNewSpecialty()}>
                        <FormattedMessage id="admin.manage-clinic.btn-save"/>
                    </button>
                </div> */}
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
            <Button color="secondary" onClick={handleEditClinicClose}>
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
    // getGenderStart: () => dispatch(actions.fetchGenderStart()),
    // //position
    // getPositionStart: () => dispatch(actions.fetchPositionStart()),
    // //role
    // getRoleStart: () => dispatch(actions.fetchRoleStart()),
    // //create
    // createNewUserRedux: (data) => dispatch(actions.createNewUser(data)),
    // //fetch user
    fetchAllClinicsRedux: () => dispatch(actions.fetchAllClinic()),
    //edit
    editAClinicRedux: (data) => dispatch(actions.editAClinic(data)),
    //delete
    deleteAClinicRedux: (id) => dispatch(actions.deleteAClinic(id))
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditClinic);
