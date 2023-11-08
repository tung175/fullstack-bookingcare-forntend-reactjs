import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    position: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //admin
        case actionTypes.FETCH_GENDER_START:
            state.genders = {...state}
            state.isLoadingGender = true
            // console.log("FETCH_GENDER_STAR");
            return {
                ...state,
                // genders: [],
                // adminInfo: action.adminInfo
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // console.log("FETCH_GENDER_SUCCESS");
            state.isLoadingGender = false
            state.genders = action.data
            // console.log("copystate", state);
            return {
                ...state
                // ...state,
                // genders: [],
                // adminInfo: null
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false
            state.genders = []
            // console.log("FETCH_GENDER_FAILED");
            return {
                ...state,
                // genders: [],
                // adminInfo: null
            }
        //position
        case actionTypes.FETCH_POSITION_START:
            state.position = {...state}
            state.isLoadingGender = true
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:        
            state.isLoadingGender = false
            state.position = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoadingGender = false
            state.position = []
            return {
                ...state,
            }
        //role
        case actionTypes.FETCH_ROLE_START:
            state.roles = {...state}
            state.isLoadingGender = true
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.isLoadingGender = false
            state.roles = action.data
            // console.log("FETCH_ROLE_SUCCESS", state.roles);
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoadingGender = false
            state.roles = []
            return {
                ...state,
            }
        //all-users
        case actionTypes.FETCH_ALL_USERS_START:
            state.users = {...state}
            state.isLoadingGender = true
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.isLoadingGender = false
            state.users = action.users
            // console.log("FETCH_ALL_USERS_SUCCESS", state.users);
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.isLoadingGender = false
            state.users = []
            return {
                ...state,
            }
        //Top doctors
        case actionTypes.FETCH_TOP_DOCTORS_START:
            state.users = {...state}
            state.isLoadingGender = true
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.isLoadingGender = false
            state.topDoctors = action.dataDoctors
            // console.log("FETCH_TOP_DOCTORS_SUCCESS", state.topDoctors);
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.isLoadingGender = false
            state.topDoctors = []
            return {
                ...state,
            }
        //all user
        case actionTypes.FETCH_ALL_DOCTORS_START:
            state.allDoctors = {...state}
            state.isLoadingGender = true
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.isLoadingGender = false
            state.allDoctors = action.data
            // console.log("FETCH_TOP_DOCTORS_SUCCESS", state.topDoctors);
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.isLoadingGender = false
            state.topDoctors = []
            return {
                ...state,
            }
        // all schedule time
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_START:
            state.allScheduleTime = {...state}
            state.isLoadingGender = true
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.isLoadingGender = false
            state.allScheduleTime = action.dataTime
            // console.log("FETCH_TOP_DOCTORS_SUCCESS", state.topDoctors);
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.isLoadingGender = false
            state.allScheduleTime = []
            return {
                ...state,
            }
        // required doctor infor 
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START:
            state.allRequiredDoctorInfor = {...state}
            state.isLoadingGender = true
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.isLoadingGender = false
            state.allRequiredDoctorInfor = action.allRequiredData
            // console.log("check state redux: ", state, action);
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.isLoadingGender = false
            state.allRequiredDoctorInfor = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;