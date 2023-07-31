import React from 'react'
import { Link } from 'react-router-dom'
import "./Slider.css"
import logo from "../../image/shef1.png"
const Sidebar = () => {
    return (


        <div className="container">
            <div className="col-md ">
                <div className='col-md slidebar'>
                    <div className="col-md-2">
                        <div className="head"><Link to="/"><h5><img src={logo} alt="caters" /> Mangalam Caters</h5></Link></div>
                    </div>

                    <div className="col-md-2">
                        <Link to="/admin/dashboard"><p>Dashboard</p></Link>
                    </div>
                    <div className="col-md-2">
                        <Link to="/admin/orders"><p>Orders</p></Link>
                    </div>
                    <div className="col-md-2">
                        <Link to="/admin/users"><p>Users</p></Link>
                    </div>
                    <div className="col-md-2">
                        <Link to="/admin/products/create"><p>Add Product</p></Link>
                    </div>
                    <div className="col-md-2">
                        <Link to="/admin/products"><p>Product</p></Link>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Sidebar
