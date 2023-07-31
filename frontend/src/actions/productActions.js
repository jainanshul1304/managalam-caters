import axios from "axios";

import {
    All_PRODUCT_FAIL, All_PRODUCT_SUCESS, All_PRODUCT_REQUEST, CLEAR_ERRORS,
    PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCESS, PRODUCT_DETAIL_FAIL,
    Admin_PRODUCT_REQUEST, Admin_PRODUCT_SUCESS, Admin_PRODUCT_FAIL,
    REMOVE_PRODUCT_REQUEST, REMOVE_PRODUCT_SUCESS, REMOVE_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCESS, NEW_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCESS, UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCESS,
    SEARCH_PRODUCT_FAIL,
} from "../constants/productConstants";
import { UPDATE_PASSWORD_REQUEST } from "../constants/userConstants";


export const getProduct = (keyword = "", currentPage = 1, category) => async (dispatch) => {
    try {
        dispatch({ type: All_PRODUCT_REQUEST });
        let link = `/api/v1/products/?keyword=${keyword}&page=${currentPage}`;
        if (category) {
            link = `/api/v1/products/?keyword=${keyword}&page=${currentPage}&category=${category}`;
        }

        const { data } = await axios.get(link);
        //      http://localhost:4000/api/v1/products/?keyword=16

        dispatch({

            type: All_PRODUCT_SUCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: All_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Clearing error
/*
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}
*/
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        const { data } = await axios.get(`/api/v1/products/${id}`);

        dispatch({
            type: PRODUCT_DETAIL_SUCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({

            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Get all product foe admin

export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({ type: Admin_PRODUCT_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/products`);

        dispatch({
            type: Admin_PRODUCT_SUCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: Admin_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}


//Delete item from Product
export const adminProductDelete = (id) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_PRODUCT_REQUEST });
        const { data } = await axios.delete(`/api/v1/products/${id}`);

        dispatch({
            type: REMOVE_PRODUCT_SUCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: REMOVE_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Create Product -----------byADmin
export const createProduct = (name, price, description, category, stock) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const config = {
            headers: { "Content-Type": "application/json" },
        }
        const { data } = await axios.post(`/api/v1/products/new`, { name, price, description, category, stock }, config);

        dispatch({
            type: NEW_PRODUCT_SUCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Delete Product by admin
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(`/api/v1/products/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCESS,
            payload: data.sucess,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}

//UPDATE PRODUCT
// Create Product ADmin
export const updateProduct = (id, name, price, description, category, stock) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const config = {
            headers: { "Content-Type": "application/json" },
        }
        const { data } = await axios.put(`/api/v1/products/${id}`, { name, price, description, category, stock }, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCESS,
            payload: data.sucess,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}


//Search Product in Search bar ---------------by USer & Admin

export const searchProduct = (keyword) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_PRODUCT_REQUEST });
        const config = {
            headers: { "Content-Type": "application/json" },
        }
        const { data } = await axios.get(`/api/v1/products/${keyword}`, config);

        dispatch({
            type: SEARCH_PRODUCT_SUCESS,
            payload: data.sucess,
        });
    } catch (error) {
        dispatch({
            type: SEARCH_PRODUCT_FAIL,
            payload: error.response.data.message,
        })
    }
}
