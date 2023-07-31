import './App.css';
import React, { useState } from 'react';
import webfont, { load } from "webfontloader";
import Header from './Component/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Navbar from './Component/Navbar';
import About from './Component/User/About';
import ProductDetails from "./Component/Product/ProductDetails"
import Search from './Component/Search/Search';
import Footer2 from './Component/Footer2';
import Home from './Component/Home';
import ProductDetails2 from './Component/Product/ProductDetails2';
import Products from './Component/Products';
//import Loader from './Component/Loader/Loader';
import Search2 from './Component/Search/Search2';
import LoginSignup from './Component/User/LoginSignup';
import store from './store';
import { loadUser } from './actions/userActions';
import UserOptions from './Component/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './Component/User/Profile';
//import ProtectedRoute from './Component/Route/ProtectedRoute';
import UpdateProfile from './Component/UpdateProfile';
import UpdatePassword from './Component/User/UpdatePassword';
import Cart from './Component/cart/Cart';
import Shipping from './Component/cart/Shipping';
import ConfirmOrder from './Component/cart/ConfirmOrder';
import Myorders from './Component/Orders/Myorders';
import axios from 'axios';
import Payment from './Component/cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Dashbord from './Component/admin/Dashbord';
import ProductList from './Component/admin/ProductList';
import NewProduct from './Component/admin/NewProduct';
import UpdateProduct from './Component/admin/UpdateProduct';
import OrderList from './Component/admin/OrderList';
import NewOrder1 from './Component/admin/NewOrder1';
import UserList from './Component/admin/UserList';
import UserUpdate from './Component/admin/UserUpdate';
import Regester from './Component/User/Regester';
//import ProtectedRoute from "./Component/Route/ProtectedRoute"

function App() {

  const { isAuthenticated, user, admin } = useSelector(state => state.users)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeAPiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }


  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());
    getStripeAPiKey();
  }, [])
  return (
    <Router>

      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Search path="/products/${keyword}"/>
      <Routes>

         
      
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products  />} />
        <Route path="/Login_Reg" element={<LoginSignup />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/orders" element={<Myorders />} />
        <Route path='/About' element={<About />} />
        <Route exact path="/regester" element={<Regester />} />

        <Route path="/process/payment" element={<Payment />} />
        <Route  path="/admin/dashboard" element={<Dashbord />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/products/create" element={<NewProduct />} />
        <Route exact path="/admin/products/:id" element={<UpdateProduct/>} />
        <Route exact path="/admin/orders" element={<OrderList />} />
        <Route exact path="/admin/orders/:id" element={<NewOrder1 />} />
        <Route exact path="/admin/users" element={<UserList />} />
        <Route exact path="/admin/user/:id" element={<UserUpdate />} />
      </Routes>

      <Footer2 />

    </Router>
  );
}

export default App;
