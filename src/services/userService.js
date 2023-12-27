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
  // console.log("check data save info", data);
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

const postVerifyBookAppointmentService = (data) => {
  // console.log("check idInput", data);
  return axios.post(`/api/verify-book-appointment`, data);
};

const createNewSpecialtyService = (data) => {
  // console.log("check idInput", data);
  return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialtyService = () => {
  // console.log("check idInput", inputId);
  return axios.get(`/api/get-specialty`);
};

const getAllDetailSpecialtyByIdService = (data) => {
  // console.log("check idInput", inputId);
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

const deleteASpecialtyService = (specialtyId) => {
  return axios.delete(`/api/delete-specialty`, {
    data: {
      id: specialtyId,
    },
  });
};

const editASpecialtyService = (inputData) => {
  return axios.put("/api/edit-specialty", inputData);
};

const createNewClinicService = (data) => {
  // console.log("check idInput", data);
  return axios.post(`/api/create-new-clinic`, data);
};

const getAllClinicService = () => {
  // console.log("check idInput", inputId);
  return axios.get(`/api/get-clinic`);
};

const deleteAClinicService = (ClinicId) => {
  return axios.delete(`/api/delete-clinic`, {
    data: {
      id: ClinicId,
    },
  });
};

const editAClinicService = (inputData) => {
  return axios.put("/api/edit-clinic", inputData);
};

const getAllDetailClinicByIdService = (data) => {
  // console.log("check idInput", inputId);
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const getAllPatientForDoctorService = (data) => {
  // console.log("check idInput", inputId);
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
};

const postSendRemedyService = (data) => {
  // console.log("check idInput", data);
  return axios.post(`/api/send-remedy`, data);
};

const createNewHandbookService = (data) => {
  // console.log("check idInput", data);
  return axios.post(`/api/create-new-handbook`, data);
};

const getAllHandbookService = () => {
  // console.log("check idInput", inputId);
  return axios.get(`/api/get-handbook`);
};

const getAllDetailHandbookByIdService = (data) => {
  // console.log("check idInput", inputId);
  return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`);
};

const deleteAHandbookService = (handbookId) => {
  return axios.delete(`/api/delete-handbook`, {
    data: {
      id: handbookId,
    },
  });
};

const editAHandbookService = (inputData) => {
  return axios.put("/api/edit-handbook", inputData);
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
  postBookAppointmentService,
  postVerifyBookAppointmentService,
  createNewSpecialtyService,
  getAllSpecialtyService,
  getAllDetailSpecialtyByIdService,
  createNewClinicService,
  getAllClinicService,
  getAllDetailClinicByIdService,
  getAllPatientForDoctorService,
  postSendRemedyService,
  createNewHandbookService,
  getAllHandbookService,
  getAllDetailHandbookByIdService,
  deleteAClinicService,
  editAClinicService,
  deleteAHandbookService,
  editAHandbookService,
  deleteASpecialtyService,
  editASpecialtyService
};
