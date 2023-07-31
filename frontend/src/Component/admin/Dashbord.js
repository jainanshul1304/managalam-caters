import React, { useEffect } from 'react';  
import Sidebar from './Sidebar';
import "./Dashboard.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//import {Doughnut  , Line} from "react-chartjs-2";
const Dashbord = () => {
  
  const dispatch = useDispatch();
  const {products}  = useSelector((state)=>state.products);
  const {user} = useSelector((state)=>state.users);
  const {cartItem} = useSelector((state)=>state.cart);
  const {orders}= useSelector((state)=>state.allOrder);
  const {users}  = useSelector((state)=>state.allUser);
  
  return (
    <div>
      <Sidebar />
      <div className="dashboardcontainer">
        <div className="dashboardsummary">
            <h1>Dashboard</h1>
            <div>
                <p>
                    Total Amount <br /> 20000
                </p>
            </div>
            <div className="dashboardsummarybox2">
                <Link to="/admin/products">
                    <p>Product: {products && products.length }</p>
                    
                </Link>
                <Link to="/admin/orders" >
                    <p>Order: {orders && orders.length}</p>
                    
                </Link>
                <Link to="/admin/users">
                    <p>Users : {users && users.length}</p>
                </Link>
            </div>
        </div>
        

      </div>
    </div>
  )
}

export default Dashbord
