import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { deleteProductReducer, newProductReducer, producDetailsReducer, producReducer, searchProductReducer } from "./reducers/productReducer";
import { allUserReducer, profileReducer, userDetailReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrderReducer, newOrderReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    products: producReducer,
    productDetails: producDetailsReducer,
    users: userReducer,
    profile: profileReducer,
    cart: cartReducer, 
    myOrders:myOrderReducer,
    newOrder:newOrderReducer,
    newProduct:newProductReducer,
    deleteProduct:deleteProductReducer,
    order:orderReducer,
    allOrder:allOrdersReducer,
    allUser :allUserReducer,
    userDetail:userDetailReducer,
    searchProduct:searchProductReducer,
});

let initialState = {
    cart: {
        
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
        cartItem: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")) : [],
    },

};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;