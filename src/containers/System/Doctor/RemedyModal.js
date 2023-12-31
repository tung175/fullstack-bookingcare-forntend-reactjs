import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { CommonUtils } from "../../../utils";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { every } from "lodash";
import { FormattedMessage } from "react-intl";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;
    console.log(this.props);
    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          size="md"
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title"><FormattedMessage id="admin.manage-patient.remedy.title"/></h5>
            <button
              type="button"
              className="close"
              aria-label="close"
              onClick={closeRemedyModal}
            >
              <span aria-hidden="true">X</span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label><FormattedMessage id="admin.manage-patient.remedy.email-patient"/></label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeEmail(event)}
                />
              </div>
              <div className="col-6 form-group">
                <label><FormattedMessage id="admin.manage-patient.remedy.select-prescription"/></label>
                <input
                  className="form-control-file"
                  type="file"
                  // value={this.state.email}
                  onChange={(event) => this.handleOnChangeImage(event)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSendRemedy()}>
            <FormattedMessage id="admin.manage-patient.remedy.btn-send"/>
            </Button>
            {""}
            <Button color="secondary" onClick={closeRemedyModal}>
            <FormattedMessage id="admin.manage-patient.remedy.btn-Cancel"/>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
