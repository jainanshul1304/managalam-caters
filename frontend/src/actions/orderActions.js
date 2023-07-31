import {CREATE_ORDER_REQUEST,CREATE_ORDER_SUCESS,CREATE_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCESS, MY_ORDER_FAIL, CLEAR_ERRORS, ALL_ORDER_REQUEST, ALL_ORDER_SUCESS, ALL_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCESS, UPDATE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCESS, DELETE_ORDER_FAIL } from "../constants/orderConstants";

import axios from "axios";

//newOrders
export const createOrder = (orders) =>async(dispatch ,getState)=>{
    try {
        dispatch({ type: MY_ORDER_REQUEST });

        const config = {
            headers:{
                "Content-Type":"application/json",
            },
        };
        const {data} =await axios.post("/api/v1/order/new",config , {orders});
        dispatch({ type: CREATE_ORDER_SUCESS, payload: data });

    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message,
        });
    }
};

//My orders
export const myOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST });
        
        const { data } = await axios.get(`/api/v1/orders/me`);
        dispatch({ type: MY_ORDER_SUCESS, payload: data.orders });

    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};



//Getallorders

export const getAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ALL_ORDER_REQUEST });
        
        const { data } = await axios.get(`/api/v1/admin/orders`);
        dispatch({ type: ALL_ORDER_SUCESS, payload: data.orders });

    } catch (error) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};
//UPdate porder
export const updateOrder = (id,name) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });
        const config = {
            headers:{
                "Content-Type":"application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/admin/order/${id}`,name,config);
        dispatch({ type: UPDATE_ORDER_SUCESS, payload: data.sucess });

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};
//Delete Product

export const deleteOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });
        

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
        dispatch({ type: DELETE_ORDER_SUCESS, payload: data.sucess });

    } catch (error) {
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}