import axios from "axios";
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
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,

    CLEAR_ERRORS,
    ALL_USER_REQUEST,
    ALL_USER_SUCESS,
    ALL_USER_FAIL,
    DELETE_USER_REQUEST,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCESS,
    UPDATE_USER_FAIL,
}
    from "../constants/userConstants";

//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/v1/login`, { email, password }, config);

        dispatch({ type: LOGIN_SUCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};

//register
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`/api/v1/register`, { name, email, password }, config);

        dispatch({ type: REGISTER_SUCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message,
        })
    }
}


//loaduser profile
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`/api/v1/profile`);

        dispatch({ type: LOAD_USER_SUCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Logout
export const logout = () => async (dispatch) => {
    try {

        await axios.get(`/api/v1/logout`);

        dispatch({ type: LOGOUT_SUCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.error.response.data.message,
        })
    }
}
// Update Proifle
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.put(`/api/v1/profile/update`, { userData }, config);


        dispatch({ type: UPDATE_PROFILE_SUCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Update passowrd
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { header: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`/api/v1/password/update`, passwords, config);
    } catch (error) {
        dispatch({
            ype: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });

};

//get all user details    -------------by Admin


export const getUserDetail = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USER_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/user`);

        dispatch({
            type: ALL_USER_SUCESS,
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: ALL_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

//update user -----------BY Admin

export const userUpdate = (id, name, email, role) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const config = {
            headers: { "Content-Type": "application/jaon" },
        }
        const { data } = await axios.put(`/api/v1/admin/user/${id}`, { id, name, email, role }, config);

        dispatch({
            type: UPDATE_USER_SUCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}