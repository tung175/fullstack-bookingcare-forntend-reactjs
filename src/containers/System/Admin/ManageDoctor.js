import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGE, CRUD_ACTION } from "../../../utils";
import { getDetailInforDoctorService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  // Finish!
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: "",
      hasOldData: false,

      //save to doctor infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.getAllRequiredDoctorInforRedux();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.lastName} ${item.firstName}`;
          object.label = language === LANGUAGE.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
          // console.log("check item:", item);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGE.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
          // console.log("check item:", item);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGE.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
          // console.log("check item:", item);
        });
      }
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listAllDoctors !== this.props.listAllDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.listAllDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      // console.log("get data form redux: ", this.props.allRequiredDoctorInfor);

      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince,"PROVINCE");

      // console.log("check data new: ", dataSelectPayment, dataSelectPrice, dataSelectProvince);

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.listAllDoctors, "USERS");

      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");

      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
    // console.log("check state: ", this.state);
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({
      selectedOption
    })
    let { listPayment, listPrice, listProvince } = this.state
    let res = await getDetailInforDoctorService(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '', selectedPrice = '', selectedPayment = '', selectedProvince = ''
      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic
        nameClinic = res.data.Doctor_Infor.nameClinic
        note = res.data.Doctor_Infor.note
        paymentId = res.data.Doctor_Infor.paymentId
        priceId = res.data.Doctor_Infor.priceId
        provinceId = res.data.Doctor_Infor.provinceId

        selectedPayment = listPayment.find(item => {
          return item && item.value === paymentId
        })
        selectedPrice = listPrice.find(item => {
          return item && item.value === priceId
        })
        selectedProvince = listProvince.find(item => {
          return item && item.value === provinceId
        })
      }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,

        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince

      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: '',
        nameClinic: '',
        note: ''
      });
    }
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name
    let stateCopy = {...this.state}
    stateCopy[stateName] = selectedOption
    this.setState({
      ...stateCopy,
    });
    // console.log("click", stateCopy);
  }
  // handleOnChangeDesc = (event) => {
  //   this.setState({
  //     description: event.target.value,
  //   });
  // };

  handleChangeText = (event, id) => {
    let stateCopy = {...this.state}
    stateCopy[id] = event.target.value
    this.setState({
      ...stateCopy,
    });
  }

  render() {
    let { hasOldData } = this.state;
    // console.log("check state manage: ", this.state);

    return (
      <>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <FormattedMessage id="admin.manage-doctor.title" />
          </div>
          <div className="more-infor">
            <div className="content-left form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"/>}
              />
            </div>
            <div className="content-right">
              <label>
                <FormattedMessage id="admin.manage-doctor.intro" />
              </label>
              <textarea
                className="form-control"
                // rows="4"
                onChange={(event) => this.handleChangeText(event, 'description')}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="more-infor-extra row">
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.price"/></label>
              <Select 
              options={this.state.listPrice} 
              placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}  
              name="selectedPrice"
              onChange={this.handleChangeSelectDoctorInfor}
              />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.payment"/></label>
              <Select
                options={this.state.listPayment}
                placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>}
              onChange={this.handleChangeSelectDoctorInfor}
                name="selectedPayment"
              />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.province"/></label>
              <Select
                options={this.state.listProvince}
              onChange={this.handleChangeSelectDoctorInfor}
                placeholder={<FormattedMessage id="admin.manage-doctor.province"/>}
                name='selectedProvince'
              />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.nameClinic"/></label>
              <input className="form-control" 
              onChange={(event) => this.handleChangeText(event, 'nameClinic')}
              value={this.state.nameClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.addressClinic"/></label>
              <input className="form-control" 
              onChange={(event) => this.handleChangeText(event, 'addressClinic')}
              value={this.state.addressClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label><FormattedMessage id="admin.manage-doctor.note"/></label>
              <input className="form-control" 
              onChange={(event) => this.handleChangeText(event, 'note')}
              value={this.state.note}
              />
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <button
            onClick={() => this.handleSaveContentMarkdown()}
            className={
              hasOldData === true
                ? "save-content-doctor"
                : "create-content-doctor"
            }
          >
            {hasOldData === true ? (
              <span>
                <FormattedMessage id="admin.manage-doctor.save" />
              </span>
            ) : (
              <span>
                <FormattedMessage id="admin.manage-doctor.add" />
              </span>
            )}
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listAllDoctors: state.admin.allDoctors,
    // allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
    getAllRequiredDoctorInforRedux: () =>
      dispatch(actions.getAllRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
