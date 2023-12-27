import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManagerUser.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Button } from "reactstrap";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
  // console.log('handleEditorChange', html, text);
}
class TableManagerUser extends Component {
  // Finish!

  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [], 
      isOpen: false,
      isOpenEdit: false,
      userEdit: {}
    };
  }

  async componentDidMount() {
    this.props.fetchUsersRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id);
  };

  handleEditUser = (user) => {
    // console.log("check edit", user);
    this.setState({
      isOpenEdit: true,
      userEdit: user
    })
    // this.props.handleEditUserFromParentKey(user);
  };

  handleOpenModal = () => {
    this.setState({
      isOpen: true
    })
  }

  handleCloseModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleCloseModalEdit = () => {
    this.setState({
      isOpenEdit: !this.state.isOpenEdit
    })
  }
  
  render() {
    let { usersRedux, isOpen, isOpenEdit, userEdit } = this.state;
    // console.log("check all users: ", this.props.listUsers);
    // console.log("check state:", this.state.usersRedux);
    // console.log(usersRedux);
    return (
      <>
        <div className="user-container">
          <ModalUser 
          isOpenAddUser={isOpen}
          handleCloseModal={this.handleCloseModal}
          
          />
          {isOpenEdit &&
          <ModalEditUser
            isOpenEditUser={isOpenEdit}
            currentUser={userEdit}
            handleEditUserClose={this.handleCloseModalEdit}
          />
          }
          <div className="title text-center">Quan ly nguoi dung</div>
          <div className="user-table mt-3 mx-1">
            <Button onClick={this.handleOpenModal} color="danger" className="px-3">Add new user</Button>
            <table id="TableManagerUser">
              <tbody>
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
                {usersRedux &&
                  usersRedux.length > 0 &&
                  usersRedux.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteUser(item)}
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

        {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
