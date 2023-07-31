import { ADD_TO_CART, REMOVE_CART_ITEM ,SAVE_SHIPPING_INFO} from "../constants/cartConstants";
import { useDispatch } from "react-redux";
import axios from "axios";

//Add to cart
export const addItemToCart = (id, quantity) => async (dispatch , getState) => {

    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            id: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image[0].url,
            stock: data.product.Stock,
            quantity,
        },
    });


    localStorage.setItem("cartItem",JSON.stringify(getState().cart.cartItem));

}

//Remove from cart



export const removeItemFromCart = (id)=>async(dispatch , getState)=>{
    dispatch({
        type:REMOVE_CART_ITEM,
        payload:id,
    })
    localStorage.setItem("cartItem" , JSON.stringify(getState().cart.cartItem ));
}


//shipping

export const saveShippingInfo = (data)=>async(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    });

    //localStorage.setItem("cartItem" , JSON.stringify(data));
    localStorage.setItem("shippingInfo",JSON.stringify(data));
}

