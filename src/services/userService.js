import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const createNewUserService = (data) => {
  // console.log('check data from service' , data);
  return axios.post("/api/create-new-user", data);
};

const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const deleteUserService = (userId) => {
  return axios.delete(`/api/delete-user`, {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-infor-doctors`, data);
};

const getDetailInforDoctorService = (inputId) => {
  // console.log("check idInput", inputId);
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
  // console.log("check idInput", inputId);
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDateService = (doctorId, date) => {
  // console.log("check idInput", inputId);
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInforDoctorByIdService = (doctorId) => {
  // console.log("check idInput", inputId);
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorByIdService = (doctorId) => {
  // console.log("check idInput", inputId);
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postBookAppointmentService = (data) => {
  // console.log("check idInput", inputId);
  return axios.post(`/api/patient-book-appointment`, data);
};
export {
  handleLoginApi,
  getAllCodeService,
  createNewUserService,
  getAllUser,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getDetailInforDoctorService,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDateService,
  getExtraInforDoctorByIdService,
  getProfileDoctorByIdService,
  postBookAppointmentService
};
