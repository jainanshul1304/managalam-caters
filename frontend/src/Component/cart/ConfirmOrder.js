import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import "./ConfirmOrder.css";
import { createBrowserHistory  } from 'history';


const ConfirmOrder = () => {
  const history = createBrowserHistory();
  //const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  //const { user } = useSelector((state) => state.users);
  const { cartItem } = useSelector((state) => state.cart);

  const address = `${shippingInfo.address} ,${shippingInfo.city} ,${shippingInfo.state} ,${shippingInfo.pincode} ,${shippingInfo.country}`;
  
  const subtotal = cartItem.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharge = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.18;
  const totalprice = subtotal + shippingCharge + tax;

  const processToPayment = (e)=>{
    //e.preventDefault();
    const data= {
      subtotal,
      shippingCharge,
      tax,
      totalprice,
    }

    sessionStorage.setItem("orderInfo" , JSON.stringify(data));
    history.push("/process/payment");
    window.location.reload();
  }

  return (
    <Fragment>
      <div className="confirmOrderPage">
        <div class="row">
          <div className="col-md-3 confirmShippingArea">
            <h2>Shipping Info</h2>
            <div className="col-md-3 confirmShippingAreaBox">
              <div>
                <div>
                  <p>Address:</p>
                  <span>{shippingInfo.address}</span>
                </div>
                <div>
                  <p>Phone: </p>
                  <span>{shippingInfo.phoneNO}</span>
                </div>
                <div>
                  <p>Pincode:</p>
                  <span>{shippingInfo.pincode}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='orderSummary col-md-4'>
            <h2>Order Summary</h2>
            <div>
              <div>
                <p>SubTotal:</p>
                <span>{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charge:</p>
                <span>{shippingCharge}</span>
              </div>
              <div>
                <p>Gst:</p>
                <span>{tax}</span>
              </div>
            </div>
            <div className='ordertotal'>
              <p><b>Total:</b></p>
              <span>{totalprice}</span>
            </div>
            <button onClick={processToPayment}>Proceed To Payment</button>
          </div>

        </div>
        <div className='row'>
          <div className='confirmCartItem col-md-9'>
            {
              cartItem && cartItem.map((item) => (
                <div col-3>
                  <img src={item.image} alt="Product_Image" />
                  {item.name}
                  <p>{item.quantity * item.price}</p>
                </div>

              ))
            }
          </div>
        </div>
        
      </div>
    </Fragment>
  )
}

export default ConfirmOrder
