import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "./ProductDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../actions/productActions';
import ReactStars from 'react-rating-stars-component';
import Loader from '../Loader/Loader';
//import Products from '../Product';

import { addItemToCart } from '../../actions/cartActions';
import { createBrowserHistory } from 'history';
import { getProduct } from '../../actions/productActions';

const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 5,
    isHalf: true,

}



const ProductDetails = () => {



    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        const qty = quantity - 1;
        if (qty == 0) {
            return;
        }
        setQuantity(qty);
    }

    const dispatch = useDispatch();
    /*
         const {product,  loading, error } = useSelector(
             (state) => state.productDetails
         );
     */
    //const {product, loading } = useSelector((state) => state.productDetails);
    const { products } = useSelector((state) => state.products);
    const { id } = useParams();
    const { product, loading } = useSelector((state) => state.productDetails);

    const history = createBrowserHistory();
    const addToCartHandeler = () => {
        dispatch(addItemToCart(id, quantity));
        // history.push("/cart");
        //window.location.reload();
    }

    useEffect(() => {

        dispatch(getProductDetails(id));
        dispatch(getProduct());
    }, [dispatch, id]);

    /*
      const found = products.find(products => {
          if(products.id === product.id){
              return products.image ;
          }
          return 0;
      });
  */
    return (

        <Fragment>
            {
                loading ? (<Loader />) : (
                    <Fragment>

                        <div className='productDetails col-md'>
                            <div className='carouselImage col-md'>

                                <div className='detailBlock1'>
                                  

                                    <h2>{product.name}</h2>


                                </div>
                                <div className='detailBlock2'>

                                </div>
                                <div className='detailBlock3'>
                                    <h1>{`₹${product.price}`}</h1>
                                    <div className='detailBlock-3-1'>
                                        <div className='detailBlock-3-1-1'>
                                            <button onClick={decreaseQuantity}>-</button>
                                            <input value={quantity} type="number" />
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>
                                        <button onClick={addToCartHandeler}>Add To Cart</button>
                                    </div>
                                    <p>
                                        Status:{" "}
                                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                        </b>
                                    </p>

                                </div>
                                <div className='detailBlock4'>
                                    Description:<p>{product.description}</p>
                                </div>
                                <button className='submitReviews'>Submit Reviews</button>
                            </div>
                        </div>
                    </Fragment>

                )
            }
        </Fragment>

    )
}

export default ProductDetails;
