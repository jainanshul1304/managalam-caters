import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetail, userUpdate } from '../../actions/userActions';
import Sidebar from './Sidebar'
import del from "../../image/delete.jpeg";
import edit from "../../image/edit.jpeg";
import { createBrowserHistory } from '@remix-run/router';
import { useParams } from 'react-router-dom';
import MetaData from '../MetaData';
const UserList = () => {
    <MetaData title="All Users" />
    const { users } = useSelector((state) => state.allUser);
    const history = createBrowserHistory();
    const { id } = useParams();
    //Update user
    const editUserProfile = (id) => {
        dispatch(userUpdate(id));
        history.push(`/admin/user/${id}`);
        window.location.reload();
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserDetail())
    }, [dispatch]);
    return (
        <Fragment>
            <Sidebar />
            <div className="myorderspge">
                <h2>All Users</h2>
                <div className='container2'>

                    <div class="col-4">
                        Product ID
                    </div>
                    <div class="col-2">
                        Role
                    </div>
                    <div class="col-2">
                        Name
                    </div>
                    <div class="col-3">
                       Email
                    </div>
                    <div class="col-1">
                        Action
                    </div>
                </div>
                {
                    users && users.map((item) => (
                        <div col-3>
                            <div class="col-3">
                                {item._id}
                            </div>
                            <div class="col-2">
                                {item.role}
                            </div>
                            <div class="col-2">
                                {item.name}
                            </div>
                            <div class="col-2">
                                {item.email}
                            </div>
                            <div class="col-1" id="img1">
                                <p><img src={del} alt="delete" /></p>

                            </div>

                            <div class="col-1" id="img2">
                                <p><img src={edit} alt="edit" onClick={() => editUserProfile(item._id)} /></p>

                            </div>
                        </div>

                    ))
                }

            </div>
        </Fragment>
    )
}

export default UserList
