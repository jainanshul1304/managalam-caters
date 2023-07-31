import React, { Fragment, useEffect, useState } from 'react';
import "./UpdatePassword.css";
import Loader from '../Loader/Loader';
import { useSelector , useDispatch } from 'react-redux';
import { updatePassword } from '../../actions/userActions';
import { createBrowserHistory } from 'history';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { Link } from 'react-router-dom';

const UpdatePassword = () => {
    const history = createBrowserHistory();
    const dispatch = useDispatch() ;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {isUpdated, loading } = useSelector((state) => state.profile);
    
    const updatePasswordSubmit = (e)=>{
        e.prevenrDefault();

        const  myForm = new FormData();

        myForm.set("oldPassword" ,oldPassword);
        myForm.set("newPassword" ,newPassword);
        myForm.set("confirmPassword" ,confirmPassword);

        dispatch(updatePassword(myForm));

    };
    useEffect(()=>{
        if (isUpdated) {
            alert.sucess("Profile updated sucessfully...");
            
            history.push("/account");
        }
       
    },[dispatch , history , isUpdated]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBoxx" id="LoginSignUpBoxx">
                                 <h2 className="update">Update Password</h2>
                            <form className="loginForm"  onSubmit={updatePasswordSubmit}>

                                <div className="UPdatePassword">
                                    <input
                                        type="password"
                                        placeholder="old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                
                                <div className="UpdatePassword">
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="UPdatePassword">
                                    <input
                                        type="password"
                                        placeholder="confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                               
                                <Link to="/account" ><input  type="submit" value="Update Password" className="UpdateBtn" /></Link>
                            </form>


                        </div>
                    </div>
                </Fragment>

            }
        </Fragment>
    )
}

export default UpdatePassword
