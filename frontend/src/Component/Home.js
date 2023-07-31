import React, { Fragment, useEffect } from "react";
import home from "./Home.css";
import Product from "./Product";
import shef1 from "../image/shef1.png"
import MetaData from "./MetaData";
import { getProduct } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { Connect } from "react-redux";
import Loader from "./Loader/Loader";
import { Link, useParams } from "react-router-dom";
import insta from "../image/insta.jpeg";
import whatsapp from "../image/whatsapp.jpeg";
import cart1 from "../image/cart1.jpeg";
import { createBrowserHistory } from "history";
import reg from "../image/reg3.png";
/*
const product={
    name:"Shirt_for_man",
    image:[{url:"https://www.pexels.com/photo/assorted-clothes-996329/"}],
    price:"3455",
    _id:"rahul321",
};
*/
const Home = () => {

    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    );
    //const {product} = useSelector((state)=>state.productDetails);
    const { id } = useParams();
    //const history = createBrowserHistory();

    useEffect(() => {

        dispatch(getProduct());
        //window.location.reload();
    }, [dispatch, id]);

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <MetaData title="MGC" />
                    <div class="sticky-left">

                        <p><Link to="/cart"><img src={cart1} alt="cart" /></Link></p>
                        <p> <a href="https://instagram.com/rahulagarwal90474?igshid=ZDdkNTZiNTM="><img src={insta} class="" alt="insta" /></a></p>
                        <p><a href="https://www.instagram.com/"><img src={whatsapp} alt="insta" /></a></p>
                        <p><Link to="/regester"><img src={reg} alt="insta" /></Link></p>
                    </div>
                    
                    <div className="home">

                        <h3>Welcome In Mangalam Caters</h3>
                        <p>Getting Best Deal </p>

                    </div>


                    <h2 className="homeheading">Featured Product</h2>
                    <div className="containe" id="container">
                        {products && products.map((product) => <Product product={product} />)}

                    </div>


                </Fragment>
            )}
        </Fragment>


    );
};
export default Home;