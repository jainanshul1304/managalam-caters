import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
//import { useSelector } from "react-redux";
import "./Product.css";


const options = {

    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 3,
    isHalf: true,

}
const Product = ({ product }) => {
    //const  {product} = useSelector((state)=>state.productDetails);
   
  
    return (
        <Link className="productCard" to={`/products/${product._id}`}>
            <div><img src={product.image[0].
                public_url} alt="My Image"/></div>
            
            <p>{product.name}</p>
            <p>{product.category}</p>
            <span>{`₹${product.price}`}</span><br></br>
            <div>
                <ReactStars {...options} /><span>(Reviews)</span>
            </div>

        </Link>
    );
};



export default Product;
