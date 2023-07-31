import React, { Fragment, useState } from 'react'

//import {SpeedDial , SpeedDialAction} from "@material-ui/lab" ;
import profile from "../image/download.jpeg";
import "./UserOptions.css";
import { createBrowserHistory } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';



const UserOptions = () => {
    const {user}= useSelector((state)=>state.users);
    const history = createBrowserHistory();
    const dispatch = useDispatch();
    const options = [
        { name: "Orders", func: orders },
        { name: "Profile", func: account },
        {name:"Cart" , func:cart},
        
        { name: "Logout", func: logoutUser },
       
        
    ]

    if (user.role === "admin") {
        options.unshift({name:"admin" , func:dashbord})
    }

    function dashbord() {
        history.push("/admin/dashboard");
    }
    function orders() {
        history.push("/orders");
    }
    function account() {
        history.push("/account");
    }
    
    function cart(){
        history.push("/cart");
    }
    function adminaccount(){
        
            history.push("/admin/dashboard");
        
    }
    function logoutUser() {
         dispatch(logout());
         history.push("/","Logout sucessfully...");
       
    }
    

    return (
        <Fragment>


            <div class="btn-group" className="profile">
                <button type="button" class="btn btn-gray dropdown-toggle" data-bs-toggle="dropdown">Profile</button>
                <div class="dropdown-menu">
                    {options.map((item) => (
                        <a href="#" class="dropdown-item" name={item.name} onClick={item.func} >{item.name}</a>

                    ))}
                   
                </div>
            </div>

        </Fragment>
    )
}

export default UserOptions




