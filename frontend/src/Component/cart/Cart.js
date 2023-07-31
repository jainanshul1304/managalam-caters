import React, { Fragment, useState } from 'react'
import "./Cart.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../../actions/cartActions'
import { Link, useParams } from 'react-router-dom';
import img from "../../image/download.jpeg"
import { createBrowserHistory } from 'history';



const Cart = () => {
    //const history = createBrowserHistory();
    const { id } = useParams();
    
    const item = {
        product: "ra",
        name: "ccc",
        price: "345",
        stock: "3",
    }

    const deleteCartItem = () => {
        dispatch(removeItemFromCart());
    }

    const dispatch = useDispatch();
    const { cartItem } = useSelector((state) => state.cart);


    //const [quantity , setQuantity] = useState(1) ;
    const increaseQua = (id) => {
        // const qua = quantity + 1;
        //setQuantity(qua);
    }
    const decreaseQua = (id) => {
        // const qua =quantity - 1;
        //setQuantity(qua);
    }

   


    return (
        
        <Fragment>
            {
            
                <Fragment>
                    <div class="containerr">
                        <div className='container2'>

                            <div class="col-7">
                                Product
                            </div>
                            <div class="col-2">
                                Item
                            </div>
                            <div class="col-3">
                                Subtotal
                            </div>

                        </div>


                        {
                            cartItem && cartItem.map((item) => (
                                <div className="cartContainer" key={item.product}>
                                    <div class="col-7">
                                        <CartItem item={item} deleteCartItem={() => deleteCartItem()} />
                                    </div>
                                    <div class="col-3">
                                        <div className="cartInput">

                                            <input type="number" value={item.quantity} />

                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <p className="cartSubTotal">{
                                            `${item.price * item.quantity}`
                                        }</p>
                                    </div>

                                </div>
                            ))
                        }

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`${cartItem.reduce((acc , item)=>acc + item.quantity*item.price,0)}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutButton">
                                <Link to="/shipping">Check OUt</Link>
                               
                            </div>
                        </div>
                    </div>
                </Fragment>
        }
        </Fragment>


    )
}

export default Cart;
