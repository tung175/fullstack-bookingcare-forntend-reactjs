import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageHandbook.scss";
import MarkdownIt from "markdown-it";
import MdEditor from 'react-markdown-editor-lite'
import {CommonUtils} from '../../../utils'
import { toast } from "react-toastify";
import { createNewHandbookService, createNewSpecialtyService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";


const mdParser = new MarkdownIt

class ManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: ''
    };
  }

  componentDidMount() {}

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

  handleSaveNewHandbook = async () => {
    let res = await createNewHandbookService(this.state)
    if (res && res.errCode === 0) {
      // console.log("check res ", res);
        toast.success("Add new specialty succeed!")
        this.setState({
          name: '',
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
    
    return (
      <>
        <div className="manage-specialty-container">
            <div className="ms-title"><FormattedMessage id="admin.manage-handbook.title"/></div>
            <div className="add-new-specialty row">
                <div className="col-6 form-group">
                    <label><FormattedMessage id="admin.manage-handbook.name"/></label>
                    <input className="form-control" type="text" value={this.state.name}
                    onChange={(event) => this.handleChangeInput(event, 'name')}/>
                </div>
                <div className="col-6 form-group">
                    <label><FormattedMessage id="admin.manage-specialty.image"/></label>
                    <input className="form-control-file" type="file" 
                    onChange={(event) => this.handleOnChangeImage(event)}/>
                </div>
                <div className="col-12">
                    <MdEditor
                        style={{height: '500px'}}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>
                <div className="col-12">
                    <button className="btn-save-specialty"
                    onClick={() => this.handleSaveNewHandbook()}>
                        <FormattedMessage id="admin.manage-handbook.btn-save"/>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
