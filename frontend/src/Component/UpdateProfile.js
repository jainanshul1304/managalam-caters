import React, { Fragment, useRef, useState, useEffect } from 'react'
import "./UpdateProfile.css";
import Loader from './Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../actions/userActions';
import { createBrowserHistory } from 'history';
import { UPDATE_PROFILE_REQUEST } from '../constants/userConstants';

const UpdateProfile = () => {
    const [userj, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const history = createBrowserHistory();
    const dispatch = useDispatch();
    const { user, isUpdated, loading } = useSelector((state) => state.users);
    const [name, setName] = useState(" ");
    const [email, setEmail] = useState(" ");
    
    const updateProfileDataChange = (e) => {
        e.preventDefault();
       // isUpdated({ ...user, [e.target.name]: e.target.value });
    }

    //const { name, email, password } = user;
    const updateProfileSubmit = (e) => {
        //e.preventDefault();
        //userData  -----userAction.js
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
      
        console.log("signUp Form Submited")
        dispatch(updateProfile(myForm));
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
        if (isUpdated) {
            alert.sucess("Profile updated sucessfully...");
            dispatch(loadUser());
            history.push('/profile/update');
        }
        dispatch({
            type:UPDATE_PROFILE_REQUEST,
        })
       
    }, [dispatch, history, user, isUpdated]);


    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>
                        <div className="UpdateProfileContainer">
                            
                            <div className="UpdateProfileBoxx" id="UpdateProfileBoxx">
                            <h2 className="pu">Profile Update</h2>
                                <form className="UpdateProfileForm"
                                    encType="multipart/form-data"
                                    onSubmit={updateProfileSubmit}>


                                    <div className="UpdateProfileName">
                                        <input
                                            type="name"
                                            placeholder="Name"
                                            required
                                            name="name"
                                            value={name}
                                            onChange={updateProfileDataChange}
                                        />
                                    </div>

                                    <div className="UpdateProfileEmail">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={updateProfileDataChange}
                                        />
                                    </div>



                                    <input
                                        type="submit"
                                        value="Update"
                                        className="UpdateProfileBtn"
                                    // disabled={loading?true:false}
                                    />
                                </form>
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default UpdateProfile

