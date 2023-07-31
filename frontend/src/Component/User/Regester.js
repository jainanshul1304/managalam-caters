import React, { Fragment, useState } from 'react'
import "./LoginSignup.css";
//import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
//mport { clearErrors, register } from '../../actions/userActions';
//import { createBrowserHistory } from 'history';
//import { Location } from 'history';
import "./Regester.css";

function Regester() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''

    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = () => {
        fetch('/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // handle success response
            })
            .catch(error => console.error(error)); // handle error response
    }

    return (
        <Fragment>
            <div className='container'>
                <div className="fome1 row">
                    <div className=" fome col-md">
                        <div className="box">
                            <h1>Regester</h1>
                            <form className="loginfome">
                                <div className="loginName">
                                    <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleInputChange} />
                                </div>

                                <div className="loginEmail">
                                    <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleInputChange} />
                                </div>

                                <div className="loginPassword">
                                    <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleInputChange} />

                                </div>

                                <Link to="/"><button type="button" onClick={handleFormSubmit}>Submit</button></Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Regester;
