import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUser,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getAllSpecialtyService, getAllClinicService, deleteAClinicService, editAClinicService, getAllHandbookService, deleteAHandbookService, editAHandbookService, deleteASpecialtyService, editASpecialtyService
} from "../../services/userService";
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })

//admin
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        // console.log("check get state: ", getState);
        dispatch(fetchGenderSuccess(res.data));
        // console.log("check res", res.data);
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        // console.log("check get state: ", getState);
        dispatch(fetchPositionSuccess(res.data));
        // console.log("check res", res.data);
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        // console.log("check get state: ", getState);
        dispatch(fetchRoleSuccess(res.data));
        // console.log("check res", res.data);
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//save btn
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.CREATE_USER_START });
      let res = await createNewUserService(data);
      console.log(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new user succeed!");
        dispatch(saveUserSuccess());
        // dispatch(saveUserSuccess(res.data.reverse()));
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("create user error!");
        dispatch(saveUserFailed());
      }
    } catch (e) {
      toast.error("create user error!");
      dispatch(saveUserFailed());
      console.log("fetchRoleFailed error", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  // data: roleData
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

//FETCH-ALL-USERS
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_USERS_START });
      let res = await getAllUser("ALL");
      if (res && res.errCode === 0) {
        toast.success("fetch all users succeed!");
        // console.log("check get state: ", getState);
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
        // console.log("check res", res.users);
      } else {
        // toast.error("fetch all users error!");

        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("fetch all users error catch!");

      dispatch(fetchAllUsersFailed());
      // console.log("fetchAllUsersStart error", e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

//delete

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.DELETE_USER_START });
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("delete the user succeed!");
        // console.log("check get state: ", getState);
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
        //   console.log("check res", res.users);
      } else {
        toast.error("delete the users error!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("delete the users error!");

      dispatch(deleteUserFailed());
      console.log("saveUserFailed error", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

//Edit

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.EDIT_USER_START });
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the user succeed!");
        // console.log("check get state: ", getState);
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
        //   console.log("check res", res.users);
      } else {
        toast.error("Update the users error!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("delete the users error!");

      dispatch(editUserFailed());
      console.log("Edit UserFailed error", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

//Doctors home top
// export const fetchTopDoctor = () => {
//   return async (dispatch, getState) => {
//     try {
//       dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_START });
//       let res = await getTopDoctorHomeService();
//       if (res && res.errCode === 0) {
//         toast.success("FETCH_TOP_DOCTORS succeed!");
//         // console.log("check get state: ", getState);
//         dispatch(fetchTopDoctorsSuccess(res.data));

//         // console.log("check res", res.users);
//       } else {
//         toast.error("FETCH_TOP_DOCTORS error!");

//         dispatch(fetchTopDoctorsFailed());
//       }
//     } catch (e) {
//       toast.error("fetch top doctors error catch!");

//       dispatch(fetchTopDoctorsFailed());
//       console.log("fetchAll top doctors error", e);
//     }
//   };
// };

// export const fetchTopDoctorsSuccess = (data) => ({
//   type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
//   data: data,
// });

// export const fetchTopDoctorsFailed = () => ({
//   type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
// });
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_START });
      let res = await getTopDoctorHomeService("");
      // console.log("check res get top doctors", res);
      if (res && res.errCode === 0) {
        // toast.success("FETCH_TOP_DOCTORS succeed!");
        // console.log("check get state: ", getState);
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });

        // console.log("check res", res.users);
      } else {
        toast.error("FETCH_TOP_DOCTORS error!");

        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      toast.error("fetch top doctors error catch!");

      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
      console.log("fetchAll top doctors error", e);
    }
  };
};

//all doctors
export const fetchAllDoctors = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_START });
      let res = await getAllDoctorsService();
      if (res && res.errCode === 0) {
        toast.success("fetch user succeed!");
        // console.log("check get state: ", getState);
        dispatch(fetchAllDoctorSuccess(res.data));
        // dispatch(fetchAllUsersStart());
        //   console.log("check res", res.users);
      } else {
        toast.error("fetch users error!");
        dispatch(fetchAllDoctorFailed());
      }
    } catch (e) {
      toast.error("fetch users error!");

      dispatch(fetchAllDoctorFailed());
      console.log("fetch Failed error", e);
    }
  };
};

export const fetchAllDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  data: data,
});

export const fetchAllDoctorFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

//SAVE infor doctor
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_START });
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("save detail succeed!");
        // console.log("check get state: ", getState);
        dispatch(saveDetailDoctorSuccess());
        // dispatch(fetchAllUsersStart());
          console.log("check res", res);
      } else {
        // console.log(res);
        toast.error("save detail error!");
        dispatch(saveDetailDoctorFailed());
      }
    } catch (e) {
      toast.error("save detail error!");

      dispatch(saveDetailDoctorFailed());
      console.log("save detail error", e);
    }
  };
};

export const saveDetailDoctorSuccess = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
  // data: data
});

export const saveDetailDoctorFailed = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});

// ALLCODE SCHEDULE TIME
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_START });
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        toast.success("fetch all code schedule time succeed!");
        // console.log("check get state: ", getState);
        dispatch(fetchAllScheduleTimeSuccess(res.data));
        // dispatch(fetchAllUsersStart());
        //   console.log("check res", res.users);
      } else {
        toast.error("fetch all code schedule time error!");
        dispatch(fetchAllScheduleTimeFailed());
      }
    } catch (e) {
      toast.error("fetch all code schedule time error!");

      dispatch(fetchAllScheduleTimeFailed());
      console.log("fetch all code schedule time error", e);
    }
  };
};

export const fetchAllScheduleTimeSuccess = (dataTime) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
  dataTime: dataTime,
});

export const fetchAllScheduleTimeFailed = () => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
});

//required doctor infor

export const getAllRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialtyService()
      let resClinic = await getAllClinicService()
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data
        }
        // console.log("check data all res: ", data);

        toast.success("getAllRequiredDoctorInfor succeed!");
        // console.log("check get state: ", getState);
        dispatch(getAllRequiredDoctorInforSuccess(data));
        // dispatch(fetchAllUsersStart());
        //   console.log("check res", res.users);
      } else {
        toast.error("getAllRequiredDoctorInfor error!");
        dispatch(getAllRequiredDoctorInforFailed());
      }
    } catch (e) {
      toast.error("getAllRequiredDoctorInfor error!");

      dispatch(getAllRequiredDoctorInforFailed());
      console.log("getAllRequiredDoctorInfor error", e);
    }
  };
};

export const getAllRequiredDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  allRequiredData: allRequiredData,
});

export const getAllRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});

//clinic
export const fetchAllClinic = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_CLINIC_START });
      let res = await getAllClinicService();
      if (res && res.errCode === 0) {
        toast.success("fetch clinic succeed!");
        // console.log("check get state: ", getState);
        dispatch(fetchAllClinicSuccess(res.data));
        // console.log("check data redux",res.data);
        // dispatch(fetchAllUsersStart());
        //   console.log("check res", res.users);
      } else {
        toast.error("fetch users error!");
        dispatch(fetchAllClinicFailed());
      }
    } catch (e) {
      toast.error("fetch users error!");
      dispatch(fetchAllClinicFailed());
      // console.log("fetch Failed error", e);
    }
  };
};

export const fetchAllClinicSuccess = (dataClinic) => ({
  type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
  data: dataClinic,
});

export const fetchAllClinicFailed = () => ({
  type: actionTypes.FETCH_ALL_CLINIC_FAILED,
});

export const deleteAClinic = (ClinicId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.DELETE_A_CLINIC_START });
      let res = await deleteAClinicService(ClinicId);
      if (res && res.errCode === 0) {
        toast.success("delete the Clinic succeed!");
        // console.log("check get state: ", getState);
        dispatch(deleteAClinicSuccess());
        dispatch(fetchAllClinic());
        //   console.log("check res", res.users);
      } else {
        toast.error("delete the Clinic error!");
        dispatch(deleteAClinicFailed());
      }
    } catch (e) {
      toast.error("delete the Clinic error!");

      dispatch(deleteAClinicFailed());
      console.log("save clinic Failed error", e);
    }
  };
};

export const deleteAClinicSuccess = () => ({
  type: actionTypes.DELETE_A_CLINIC_SUCCESS,
});

export const deleteAClinicFailed = () => ({
  type: actionTypes.DELETE_A_CLINIC_FAILED,
});

export const editAClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.EDIT_A_CLINIC_START });
      let res = await editAClinicService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the clinic succeed!");
        console.log("check get data: ", res);
        dispatch(editAClinicSuccess());
        dispatch(fetchAllClinic());
        //   console.log("check res", res.users);
      } else {
        toast.error("Update the clinic error!");
        dispatch(editAClinicFailed());
      }
    } catch (e) {
      toast.error("Update the clinic error!");

      dispatch(editAClinicFailed());
      console.log("Edit clinic Failed error", e);
    }
  };
};

export const editAClinicSuccess = () => ({
  type: actionTypes.EDIT_A_CLINIC_SUCCESS,
});

export const editAClinicFailed = () => ({
  type: actionTypes.EDIT_A_CLINIC_FAILED,
});

//Handbook
export const fetchAllHandbook = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_HANDBOOK_START });
      let res = await getAllHandbookService();
      if (res && res.errCode === 0) {
        toast.success("fetch handbook succeed!");
        // console.log("check get state: ", getState);
        dispatch(fetchAllHandbookSuccess(res.data));
        // console.log("check data redux",res.data);
        // dispatch(fetchAllUsersStart());
        //   console.log("check res", res.users);
      } else {
        toast.error("fetch handbook error!");
        dispatch(fetchAllHandbookFailed());
      }
    } catch (e) {
      toast.error("fetch handbook error!");
      dispatch(fetchAllHandbookFailed());
      // console.log("fetch Failed error", e);
    }
  };
};

export const fetchAllHandbookSuccess = (dataClinic) => ({
  type: actionTypes.FETCH_ALL_HANDBOOK_SUCCESS,
  data: dataClinic,
});

export const fetchAllHandbookFailed = () => ({
  type: actionTypes.FETCH_ALL_HANDBOOK_FAILED,
});

export const deleteAHandbook = (ClinicId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.DELETE_A_HANDBOOK_START });
      let res = await deleteAHandbookService(ClinicId);
      if (res && res.errCode === 0) {
        toast.success("delete the Handbook succeed!");
        // console.log("check get state: ", getState);
        dispatch(deleteAHandbookSuccess());
        dispatch(fetchAllHandbook());
        //   console.log("check res", res.users);
      } else {
        toast.error("delete the Handbook error!");
        dispatch(deleteAHandbookFailed());
      }
    } catch (e) {
      toast.error("delete the Handbook error!");

      dispatch(deleteAHandbookFailed());
      console.log("save Handbook Failed error", e);
    }
  };
};

export const deleteAHandbookSuccess = () => ({
  type: actionTypes.DELETE_A_HANDBOOK_SUCCESS,
});

export const deleteAHandbookFailed = () => ({
  type: actionTypes.DELETE_A_HANDBOOK_FAILED,
});

export const editAHandbook = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.EDIT_A_HANDBOOK_START });
      let res = await editAHandbookService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the handbook succeed!");
        console.log("check get data: ", res);
        dispatch(editAHandbookSuccess());
        dispatch(fetchAllHandbook());
        //   console.log("check res", res.users);
      } else {
        toast.error("Update the handbook error!");
        dispatch(editAHandbookFailed());
      }
    } catch (e) {
      toast.error("Update the handbook error!");

      dispatch(editAHandbookFailed());
      console.log("Edit handbook Failed error", e);
    }
  };
};

export const editAHandbookSuccess = () => ({
  type: actionTypes.EDIT_A_HANDBOOK_SUCCESS,
});

export const editAHandbookFailed = () => ({
  type: actionTypes.EDIT_A_HANDBOOK_FAILED,
});

//specialty
export const fetchAllSpecialty = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_SPECIALTY_START });
      let res = await getAllSpecialtyService();
      if (res && res.errCode === 0) {
        toast.success("fetch Specialty succeed!");
        // console.log("check get state: ", getState);
        dispatch(fetchAllSpecialtySuccess(res.data));
        // console.log("check data redux",res.data);
        // dispatch(fetchAllUsersStart());
        //   console.log("check res", res.users);
      } else {
        toast.error("fetch Specialty error!");
        dispatch(fetchAllSpecialtyFailed());
      }
    } catch (e) {
      toast.error("fetch Specialty error!");
      dispatch(fetchAllSpecialtyFailed());
      // console.log("fetch Failed error", e);
    }
  };
};

export const fetchAllSpecialtySuccess = (dataClinic) => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
  data: dataClinic,
});

export const fetchAllSpecialtyFailed = () => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
});

export const deleteASpecialty = (ClinicId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.DELETE_A_SPECIALTY_START });
      let res = await deleteASpecialtyService(ClinicId);
      if (res && res.errCode === 0) {
        toast.success("delete the Handbook succeed!");
        // console.log("check get state: ", getState);
        dispatch(deleteASpecialtySuccess());
        dispatch(fetchAllSpecialty());
        //   console.log("check res", res.users);
      } else {
        toast.error("delete the Handbook error!");
        dispatch(deleteASpecialtyFailed());
      }
    } catch (e) {
      toast.error("delete the Handbook error!");

      dispatch(deleteASpecialtyFailed());
      console.log("save Handbook Failed error", e);
    }
  };
};

export const deleteASpecialtySuccess = () => ({
  type: actionTypes.DELETE_A_SPECIALTY_SUCCESS,
});

export const deleteASpecialtyFailed = () => ({
  type: actionTypes.DELETE_A_SPECIALTY_FAILED,
});

export const editASpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.EDIT_A_SPECIALTY_START });
      let res = await editASpecialtyService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the Specialty succeed!");
        // console.log("check get data: ", res);
        dispatch(editASpecialtySuccess());
        dispatch(fetchAllSpecialty());
        //   console.log("check res", res.users);
      } else {
        toast.error("Update the Specialty error!");
        dispatch(editASpecialtyFailed());
      }
    } catch (e) {
      toast.error("Update the Specialty error!");

      dispatch(editASpecialtyFailed());
      console.log("Edit Specialty Failed error", e);
    }
  };
};

export const editASpecialtySuccess = () => ({
  type: actionTypes.EDIT_A_SPECIALTY_SUCCESS,
});

export const editASpecialtyFailed = () => ({
  type: actionTypes.EDIT_A_SPECIALTY_FAILED,
});