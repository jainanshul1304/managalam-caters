import {
    All_PRODUCT_SUCESS,
    All_PRODUCT_REQUEST, All_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCESS, PRODUCT_DETAIL_FAIL, CLEAR_ERRORS, Admin_PRODUCT_FAIL,
    Admin_PRODUCT_REQUEST, Admin_PRODUCT_SUCESS, REMOVE_PRODUCT_REQUEST, REMOVE_PRODUCT_SUCESS, REMOVE_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCESS, NEW_PRODUCT_RESET, NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCESS, DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCESS, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_FAIL, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCESS, SEARCH_PRODUCT_FAIL,
} from "../constants/productConstants";



export const producReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case All_PRODUCT_REQUEST:
        case Admin_PRODUCT_REQUEST:
        case REMOVE_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case All_PRODUCT_SUCESS:
        case REMOVE_PRODUCT_SUCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                //filteredProductCount:action.payload.filteredProductCount,
            };

        case Admin_PRODUCT_SUCESS:
        case REMOVE_PRODUCT_FAIL:
            return {
                loading: false,
                products: action.payload,
            }
        case All_PRODUCT_FAIL:
        case Admin_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        //Remove cart Item --------->>

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }

};

export const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_PRODUCT_SUCESS:
            return {
                loading: false,
                sucess: action.payload.sucess,
                product: action.payload.product,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                sucess: false,
            };
        case NEW_PRODUCT_FAIL:
            return {
                loading: false,
                ...state,
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

export const producDetailsReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case PRODUCT_DETAIL_SUCESS:
            return {
                loading: false,
                product: action.payload,

            };
        case PRODUCT_DETAIL_FAIL:
            return {
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

};

export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case DELETE_PRODUCT_SUCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,

            };
        case UPDATE_PRODUCT_SUCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,

            };
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
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
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        default:
            return state;
    }

};

export const searchProductReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case SEARCH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,

            };
        case SEARCH_PRODUCT_SUCESS:
            return {
                loading: false,
                product: action.payload,

            };
        case SEARCH_PRODUCT_FAIL:
            return {
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

};