import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Carousel } from "react-material-ui-carousel";
import { getProductDetails } from '../../actions/productActions';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { useState } from 'react';


const ProductDetails2 = () => {
    
    
   const params = useEffect();

    const [product , setProduct] = useState([]) ;

    const fetchApi = async () => {
       const res = await axios.get("/api/v1/products/63ccce64cd71068f11212448")
        setProduct(res);
        console.log(res.product);
    }
    
    useEffect(async() => {
        fetchApi()
    }, [])
    return (
        <div>
            <h1>ddddddddddddddd</h1>
        </div>
    )
}

export default ProductDetails2
