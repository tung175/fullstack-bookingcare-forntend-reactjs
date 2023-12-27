import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableHandbook.scss";
import * as actions from "../../../store/actions";
import { Button } from "reactstrap";
import ModalEditHandbook from "./ModalEditHandbook";

class TableHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenEdit: false,
      arrClinic: [],
      clinicEdit: {},
    };
  }

  async componentDidMount() {
    this.props.fetchAllHandbookRedux();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.HandbookRedux !== this.props.HandbookRedux) {
      this.setState({
        arrClinic: this.props.HandbookRedux,
      });
    }
  }

  handleEditClinic = (clinic) => {
    // console.log("check edit", user);
    this.setState({
      isOpenEdit: true,
      clinicEdit: clinic,
    });
    // console.log("check edit clinic",clinic);
    // this.props.handleEditUserFromParentKey(user);
  };
  handleCloseModalEdit = () => {
    this.setState({
      isOpenEdit: !this.state.isOpenEdit
    })
  }
  handleDeleteClinic = (clinic) => {
    this.props.deleteAHandbookRedux(clinic.id);
  };
  render() {
    // console.log(this.props.ClinicRedux);
    let { ClinicRedux, isOpen  } = this.props;
    let { arrClinic, clinicEdit, isOpenEdit } = this.state;
    return (
      <>
        <div className="user-container">
          {/* <ModalUser 
          isOpenAddUser={isOpen}
          handleCloseModal={this.handleCloseModal}
          
          /> */}
          {isOpenEdit && (
            <ModalEditHandbook
              isOpenEditClinic={true}
              currentClinic={clinicEdit}
              handleEditClinicClose={this.handleCloseModalEdit}
            />
          )}
          <div className="title text-center">Quan ly Cam nang</div>
          <div className="user-table mt-3 mx-1">
            <Button
              onClick={this.handleOpenModal}
              color="danger"
              className="px-3"
            >
              Add new clinic
            </Button>
            <table id="TableManagerUser">
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Img</th>
                  <th>Actions</th>
                </tr>
                {arrClinic &&
                  arrClinic.length > 0 &&
                  arrClinic.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    {
                      /* console.log(imageBase64) */
                    }
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          {/* <div className="img" style={{ background: `url(${imageBase64})`, width: "30px", height: "30px"}}></div> */}
                          <img
                            src={imageBase64}
                            alt=""
                            style={{ width: "60px", height: "60px" }}
                          />
                        </td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditClinic(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteClinic(item)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    HandbookRedux: state.admin.allHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllHandbookRedux: () => dispatch(actions.fetchAllHandbook()),
    deleteAHandbookRedux: (id) => dispatch(actions.deleteAHandbook(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHandbook);
