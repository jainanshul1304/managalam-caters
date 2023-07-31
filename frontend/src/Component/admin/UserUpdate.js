import { createBrowserHistory } from 'history';
import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { userUpdate } from '../../actions/userActions';

const UserUpdate = () => {
    const dispatch = useDispatch();
    const history = createBrowserHistory();

    const [name ,setName] =useState("");
    const [email ,setEmail] =useState("");
    const [role ,setRole] =useState("");


    const shippingSubmit = ()=>{
        dispatch(userUpdate({name, email,role}));
        history.push("/admin/users");
        window.location.reload();
    }
    return (
        
            <Fragment>
 
                <div className="LoginSignUpBoxxx" id="LoginSignUpBoxx">

                    <h2>UPDATE USER</h2>
                    <form className="shippingForm" encType='multipart/form-data' onSubmit={shippingSubmit}>

                        <div className="address">
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="city">
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="state">
                            <input
                                type="text"
                                placeholder="Role"
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                       
                       
                        
                        <input
                            type="submit"
                            value="Continue"
                            className="signUpBtn"

                        />

                    </form>


                </div>
            </Fragment>
            )
}

            export default UserUpdate
