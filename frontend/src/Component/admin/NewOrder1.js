import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import "./NewOrder1.css";
import { myOrders } from '../../actions/orderActions';
import "./NewOrder1.css";
import { updateProduct } from '../../actions/productActions';
import { updateOrder } from '../../actions/orderActions';

const NewOrder1 = () => {
  const history = createBrowserHistory();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.myOrders);
  const { shippingInfo } = useSelector((state) => state.cart);
  //const { user } = useSelector((state) => state.users);
  const { cartItem } = useSelector((state) => state.cart);
  const [name, setName] = useState("");
  const address = `${shippingInfo.address} ,${shippingInfo.city} ,${shippingInfo.state} ,${shippingInfo.pincode} ,${shippingInfo.country}`;

  const subtotal = cartItem.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharge = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.18;
  const totalprice = subtotal + shippingCharge + tax;
  const id = createBrowserHistory();
  const processToPayment = (e) => {
    //e.preventDefault();
    const data = {
      subtotal,
      shippingCharge,
      tax,
      totalprice,
    }

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  }
  const createOrderbutton = (id, e) => {
    e.preventDefault();

    dispatch(updateOrder(name))
  }
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

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
                  <span>{shippingInfo.address},{shippingInfo.city},{shippingInfo.state}</span>
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
            <h2>Payment</h2>
            <div>
              <div>
                <p>Paid</p>

              </div>


            </div>
            <div className='ordertotal'>
              <p><b>Amount:</b></p>
              <span>{totalprice}</span>
            </div>

          </div>

        </div>
        <div className="row">
          <div className="col-4">
            <div className='row'>
              <h2>Product Order</h2>
              <div className="col-4">
                <form className="createProductForm"
                  encType="multipart/fome-data"
                  onSubmit={createOrderbutton}>
                  Processing: <input type="radio"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                  Dispatch: <input type="radio"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                  Dilivered: <input type="radio"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                  <Link to="/admin/orders"><input type="submit" className="createOrderbutton" ></input></Link>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>

    </Fragment>
  )
}

export default NewOrder1
