import React, { Fragment, useEffect } from 'react'
import MetaData from '../MetaData'
import Loader from '../Loader/Loader'
import { createBrowserHistory } from 'history';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./Profile.css";

const Profile = () => {
    const history = createBrowserHistory();
    const { user, isAuthenticated, loading } = useSelector((state) => state.users);

    useEffect(() => {
        if (isAuthenticated === false) {
            history.push("/login");
        }
    }, [history, isAuthenticated])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={`${user._id}`} />
                    <div className="profileContainer">
                        <h2>My Profile</h2>
                        

                        <div className="profile2">
                            <div>
                                <h4>Full Name: </h4>
                                <p><span>{user.name}</span></p>
                            </div>
                            <div>
                                <h4>User Email: </h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joinong Date: </h4>
                                <p>{String(user.createdAt).substring(0,10)}</p>
                            </div>
                            <div className="button1">
                                <p><Link to="/orders" id="link">My orders</Link></p>
                                <p><Link to="/profile/update" id="link">Edit Profile</Link></p>
                                <p><Link to='/password/update' id="link">Password update</Link></p>
                               
                            </div>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>



    )
}

export default Profile
