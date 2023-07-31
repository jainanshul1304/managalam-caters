import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Shipping.css"
import { Link } from 'react-router-dom'
import { saveShippingInfo } from '../../actions/cartActions'
import { createBrowserHistory } from 'history'

const Shipping = () => {
    const { shippingInfo } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const history = createBrowserHistory();

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pincode, setPincode] = useState(shippingInfo.pincode);
    const [phoneNO, setPhoneNO] = useState(shippingInfo.phoneNO);

    const shippingSubmit = () => {
        

        dispatch(saveShippingInfo({ address, city, state, country, pincode, phoneNO }));
        history.push("/order/confirm");
    } ;

    return (
        <Fragment>

            <div className="LoginSignUpBoxxx" id="LoginSignUpBoxx">

                <h2> Shipping fome</h2>
                <form className="shippingForm" encType='multipart/form-data' onSubmit={shippingSubmit}>

                    <div className="address">
                        <input
                            type="text"
                            placeholder="address"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="city">
                        <input
                            type="text"
                            placeholder="city"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="state">
                        <input
                            type="text"
                            placeholder="state"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className="country">
                        <input
                            type="text"
                            placeholder="Country"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div className='phoneno'>
                        <input
                            type="Number"
                            placeholder="PhoneNo"
                            required
                            value={phoneNO}
                            onChange={(e) => setPhoneNO(e.target.value)}
                        />
                    </div>
                    <div className='pincode'>
                        <input
                            type="text"
                            placeholder="pincode"
                            required
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
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

export default Shipping
