import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCESS, CREATE_ORDER_FAIL, MY_ORDER_REQUEST,
    MY_ORDER_SUCESS, MY_ORDER_FAIL, CLEAR_ERRORS, ALL_ORDER_REQUEST, ALL_ORDER_SUCESS, ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCESS, UPDATE_ORDER_RESET, UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST, DELETE_ORDER_SUCESS, DELETE_ORDER_RESET, DELETE_ORDER_FAIL,
} from "../constants/orderConstants";


export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_ORDER_SUCESS:
            return {
                loading: false,
                order: action.payload,

            };
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}


export const myOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case MY_ORDER_SUCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        case MY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
}

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ALL_ORDER_SUCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        case ALL_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
}

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_ORDER_SUCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_ORDER_SUCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
}
