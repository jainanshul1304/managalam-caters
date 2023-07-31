import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader';
import { DataGrid } from '@material-ui/data-grid';
import { myOrders } from '../../actions/orderActions';
import { useDispatch } from 'react-redux';
import "./Myorders.css";

const Myorders = () => {
    const { user, isAuthenticated, loading } = useSelector((state) => state.users);
    const { orders } = useSelector((state) => state.myOrders);
    const { shippingInfo } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(myOrders());
    }, [dispatch]);

    const coloumns = [];
    const rows = [];

    return (
        <Fragment>
            {
                loading ? (<Loader />) : (

                    <div className="myorderspge">
                        <div className='container2'>

                            <div class="col-4">
                                Product
                            </div>
                            <div class="col-3">
                                Item ID
                            </div>
                            <div class="col-2">
                                Status
                            </div>
                            <div class="col-2">
                                SubTotal
                            </div>
                            <div class="col-2">
                                Quantity
                            </div>
                        </div>
                        {
                            orders && orders.map((item) => (
                                <div col-3>
                                    <p><img src={item.image} alt="Product_Image" /></p>
                                    <p>{item._id}</p>
                                    <p>{item.orderStatus}</p>
                                    <p>{item.totalPrice}</p>
                                    <p>{item.orderItems.length}</p>
                                </div>

                            ))
                        }
                    </div>
                )
            }
        </Fragment>

    )
}

export default Myorders
