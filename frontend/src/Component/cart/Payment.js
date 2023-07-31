import React, { Fragment, useRef } from 'react';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';
import "./Payment.css";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../actions/orderActions';
import { createBrowserHistory } from 'history';

const Payment = () => {
    const { user } = useSelector((state) => state.users);
    const { shippingInfo, cartItem } = useSelector((state) => state.cart);
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const { products } = useSelector((state) => state.products);
    const { } = useSelector((state) => state.newOrder);
    const payBtn = useRef(null);

    
    const subtotal = cartItem.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );
    const shippingCharge = subtotal > 1000 ? 0 : 100;
    const tax = subtotal * 0.18;
    const totalprice = subtotal + shippingCharge + tax;

    const dataSubmit = (e) => {
        e.preventDefault();

    }
    const dispatch = useDispatch();
    const history = createBrowserHistory();
    const submitHandeler = (e) => {
        e.preventDefault();

        const orders = {
            
            shippingInfo,

             orderItems: cartItem,
             itemsPrice: orderInfo.subtotal,
             taxPrice: orderInfo.tax,
             shippingPrice: orderInfo.shippingCharge,
             totalprice: orderInfo.totalprice,
        }
        dispatch(createOrder(orders));
        history.push("/sucess");
    }
    return (
        <Fragment>
            <form className="paymentForm" onSubmit={(e) => submitHandeler(e)} >
                <div className="box">
                    <h2>Card Info</h2>
                    <div class="row gx-3">
                        <div class="col-12">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">Persone Name</p>
                                <input class="form-control mb-3" type="text" placeholder="Name" />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">Card Number</p>
                                <input class="form-control mb-3" type="text" placeholder="1234 5678 435678" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">Expiry</p>
                                <input class="form-control mb-3" type="text" placeholder="MM/YYYY" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex flex-column">
                                <p class="text mb-1">CVV/CVC</p>
                                <input class="form-control mb-3 pt-2 " type="password" placeholder="***" />
                            </div>
                        </div>
                        <div class="hi col-11">
                            <input type="submit" value={subtotal} />
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}

export default Payment
