import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import {  Link, Route  , Redirect, Navigate} from 'react-router-dom';
const {user , loading , isAuthenticated} = useSelector((state)=>state.users);

const ProtectedRoute = ({isAdmin ,component:Component , ...rest}) => {
  return (
    <Fragment>
        {!loading && (
            <Route
                {...rest}
                render= {(props)=>{
                    if (isAdmin ===true && user.role!=="admin"){
                        return <Navigate replace to="Login_reg"/>;
                    }
                    
                    return <Component {...props} />
                }}
             />
        )}
    </Fragment>
  )
}

export default ProtectedRoute
