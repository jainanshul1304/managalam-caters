import React, { Fragment, useRef, useState, useEffect } from 'react'
import "./LoginSignup.css";
import Loader from '../Loader/Loader';
import { Link, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userActions';
import { createBrowserHistory  } from 'history';
//import { Location } from 'history';

const LoginSignup = () => {

    const dispatch = useDispatch();
    const loginTab = useRef(null);
    const switcherTab = useRef(null);
    const registerTab = useRef(null);
    const history = createBrowserHistory();

    const { loading, isAuthenticated } = useSelector((state) => state.users);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    
    const [registerEmail , setRegisterEmail] = useState("");
    const [registerName , setRegisterName] = useState("");
    const [registerPassword , setRegisterPassword] = useState("");

    const loginSubmit = (e) => {
        e.preventDefault();
        console.log("Login Form Submited");
        dispatch(login(loginEmail, loginPassword));
    }

/*
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
*/
/*
    const regesterDataChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    }
*/
  //  const { name, email, password } = user;
    const registerSubmit = (e) => {
        e.preventDefault();
        //userData  -----userAction.js
        //const myForm = new FormData();
        //myForm.set("name", name);
        //myForm.set("email", email);
        //myForm.set("password", password);

        
        dispatch(register(registerEmail,registerName,registerPassword));
        console.log("signUp Form Submited")
    }

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if (tab === "Register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }

    }
   // const redirect = Location.search ? Location.search.split(" ")[1] : "/account";
    useEffect(() => {
       // window.location.reload();
        if (isAuthenticated) {
           history.push("/");
        }
       // history.push("/");
        
    }, [dispatch, history, isAuthenticated , redirect]);


    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>
                        <div className="LoginSignUpContainer">
                            <div className="LoginSignUpBoxx" id="LoginSignUpBoxx">
                                <h1 className="logo">Login</h1>
                                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                    <div className="loginEmail">

                                        <input
                                            type="email"
                                            placeholder="Email"
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                        />
                                        
                                    </div>
                                    <div className="loginPassword">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                        />
                                    </div>
                                    <Link to="/password/forget">Forget Password</Link>
                                    <input type="submit" value="Login" className="loginBtn" />
                                </form>
  
                                
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default LoginSignup
