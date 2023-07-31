import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCESS,
    REGISTER_REQUEST,
    REGISTER_SUCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    CLEAR_ERRORS,
    ALL_USER_REQUEST,
    ALL_USER_SUCESS,
    ALL_USER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCESS,
    USER_DETAIL_FAIL,
    UPDATE_USER_REQUEST,
    DELETE_USER_REQUEST,
    UPDATE_USER_SUCESS,
    DELETE_USER_SUCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_FAIL,
    UPDATE_USER_RESET,
    DELETE_USER_RESET,

}
    from "../constants/userConstants";

export const userReducer = (state = { users: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCESS:
        case REGISTER_SUCESS:
        case LOAD_USER_SUCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT_SUCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }


}

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case UPDATE_PROFILE_SUCESS:
        case UPDATE_PASSWORD_SUCESS:
        case UPDATE_USER_SUCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_USER_SUCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }


}
export const allUserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USER_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case ALL_USER_SUCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case ALL_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }


}


export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case USER_DETAIL_SUCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case USER_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }


}

