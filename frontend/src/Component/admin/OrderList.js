import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Loader from '../Loader/Loader';
import { getAdminProduct, adminProductDelete, updateProduct } from '../../actions/productActions';
import "./ProductList.css";
import del from "../../image/delete.jpeg";
import edit from "../../image/edit.jpeg"
import { useParams } from 'react-router-dom';
import { deleteProduct } from '../../actions/productActions';
import { createBrowserHistory } from 'history';
import "./OrderList.css";
import { deleteOrder, getAllOrders, updateOrder } from '../../actions/orderActions';
import MetaData from '../MetaData';

const OrderList = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = createBrowserHistory();
    const { orders, loading } = useSelector((state) => state.allOrder);


    useEffect(() => {
       
        dispatch(getAllOrders());
    }, [dispatch]);


    const deleteOrderHandeler = (id) => {
        dispatch(deleteOrder(id));
        window.location.reload();
        
    }
    const editOrderHandeler = (id) => {
        dispatch(updateOrder(id));
        history.push(`/admin/orders/${id}`);
        window.location.reload();

    }
    /*
    const coloum = [
        { field: id, headerName: "Product_Id", minWidth: 200, flex: 0.5 },
        { field: "name ", headerName: "Name", minWidth: 200, flex: 0.5 },
        { field: "stock", headerName: "Stock", minWidth: 200, type: "number", flex: 0.5 },
        { field: "Price", headerName: "Price", type: "number", minWidth: 200, flex: 0.5 },
        {
            field: "Action", flex: 0.3, headerName: "ACtion", type: "number", minWidth: 200,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`} />
                        <img src={edit} alt="Edit" />
                        <button>
                            <img src={dele} alt="delete" />
                        </button>
                    </Fragment>
                )
            }
        }
    ];
    */
    const rows = [];



    return (
        <Fragment>
            <MetaData title="All Orders" />
            <div className="dashboard">
                
                <Sidebar />
                {
                    loading ? (<Loader />) : (

                        <div className="myorderspge">
                            <h2>All Orders</h2>
                            <div className='container2'>

                                <div class="col-3">
                                    Order ID
                                </div>
                                <div class="col-2">
                                    Orders Items
                                </div>
                                <div class="col-2">
                                    Total Price
                                </div>
                                <div class="col-2">
                                    Order Status
                                </div>
                                <div class="col-3">
                                    Action
                                </div>
                            </div>

                            {
                                orders && orders.map((item) => (
                                    <div col-3>
                                        <div class="col-3">
                                            {item._id}
                                        </div>
                                        <div class="col-2">
                                            {item.orderItems.length}
                                        </div>
                                        <div class="col-2">
                                            {item.totalPrice}
                                        </div>
                                        <div class="col-2">
                                            {item.orderStatus}
                                        </div>
                                        <div class="col-1" id="img1">
                                            <p><img src={del} alt="delete" onClick={() => deleteOrderHandeler(item._id)} /></p>

                                        </div>

                                        <div class="col-1" id="img2">
                                            <p><img src={edit} alt="edit" onClick={() => editOrderHandeler(item._id)} /></p>

                                        </div>
                                    </div>

                                ))
                            }

                        </div>
                    )
                }




            </div>
        </Fragment>
    )
}

export default OrderList
