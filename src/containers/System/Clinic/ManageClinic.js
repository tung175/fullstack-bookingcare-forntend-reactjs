import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss"
import { FormattedMessage } from "react-intl";
import Select from 'react-select'
import * as actions from '../../../store/actions'
import { CRUD_ACTION, CommonUtils, LANGUAGE, dateFormat } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import  _  from "lodash";
import {  toast } from "react-toastify";
import {createNewClinicService} from '../../../services/userService'
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite'
const mdParser = new MarkdownIt
class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
         
        }
       }
     
       handleChangeInput = (event, id) => {
         let stateCopy = {...this.state}
         stateCopy[id] = event.target.value
         this.setState({
           ...stateCopy,
         });
       }
     
       handleEditorChange = ({html, text}) => {
         this.setState({
             descriptionHTML: html,
             descriptionMarkdown: text
         })
       }
     
       handleOnChangeImage = async (event) => {
         let data = event.target.files
         let file = data[0]
         if (file) {
             let base64 = await CommonUtils.getBase64(file)
             this.setState({
                 imageBase64: base64
             })
         }
       }
     
       handleSaveNewSpecialty = async () => {
         let res = await createNewClinicService(this.state)
         if (res && res.errCode === 0) {
           // console.log("check res ", res);
             toast.success("Add new specialty succeed!")
             this.setState({
               name: '',
               address: '',
               imageBase64: '',
               descriptionHTML: '',
               descriptionMarkdown: ''
             })
         } else {
             toast.error("Something wrongs ...")
             // console.log("check", res);
         }
       }
  render() {
//    console.log('check state: ', this.state);
    return (
        <>
        <div className="manage-specialty-container">
            <div className="ms-title"><FormattedMessage id="admin.manage-clinic.title"/></div>
            <div className="add-new-specialty row">
                <div className="col-6 form-group">
                    <label><FormattedMessage id="admin.manage-clinic.name"/></label>
                    <input className="form-control" type="text" value={this.state.name}
                    onChange={(event) => this.handleChangeInput(event, 'name')}/>
                </div>
                <div className="col-6 form-group">
                    <label><FormattedMessage id="admin.manage-clinic.image"/></label>
                    <input className="form-control-file" type="file" 
                    onChange={(event) => this.handleOnChangeImage(event)}/>
                </div>
                <div className="col-6 form-group">
                    <label><FormattedMessage id="admin.manage-clinic.address"/></label>
                    <input className="form-control" type="text" value={this.state.address}
                    onChange={(event) => this.handleChangeInput(event, 'address')}/>
                </div>
                <div className="col-12">
                    <MdEditor
                        style={{height: '450px'}}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>
                <div className="col-12">
                    <button className="btn-save-specialty"
                    onClick={() => this.handleSaveNewSpecialty()}>
                        <FormattedMessage id="admin.manage-clinic.btn-save"/>
                    </button>
                </div>
            </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.app.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
