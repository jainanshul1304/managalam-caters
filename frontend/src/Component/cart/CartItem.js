import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import "./cartItem.css" 
import img from "../../image/download.jpeg"
import { useDispatch } from 'react-redux'


const CartItem = ({item ,deleteCartItem}) => {
  //const dispatch = useDispatch() ;
 
  
 
  return (
    
    <Fragment>
        <div className="cartItemCart">
            <img src={img} alt="df" />
            <div>
                <Link to ={`/product/${item.product}`} >{item.name}</Link>
                <span>{`Price: ${item.price}`}</span>
                <p onClick={()=>deleteCartItem(item.product)}>Remove</p>
            </div>
        </div>
    </Fragment>
  )
}

export default CartItem
