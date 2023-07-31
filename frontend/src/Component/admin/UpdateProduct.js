import { Button, Select } from '@mui/material';
import { createBrowserHistory } from 'history';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import MetaData from '../MetaData';
import Sidebar from './Sidebar';
import { createProduct, updateProduct,getProductDetails} from '../../actions/productActions';
import { Link, useParams } from 'react-router-dom';
import "./NewProduct.css" ;

const UpdateProduct  = () => {
    <MetaData title="Update product"/>
    const { loading, error } = useSelector((state) => state.newProduct);
   // const { authorizeRole = "admin", isAuthenticated } = useSelector((state) => state.users);
    const {products} = useSelector((state)=>state.products);
    const history = createBrowserHistory();
    //const {product}  = useSelector((state)=>state.productDetails);
    const dispatch = useDispatch();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState();

    const categorys = [
        "Laptop",
        "Chair",
        "Camera",
        "Notebook",
        "Cream",
    ];
   

    const createProductSubmitHandeler = (e) => {
        e.preventDefault();
/*
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("stock", stock);
        myForm.set("description", description);
        myForm.set("category", category);
*/
        dispatch(updateProduct(id ,name ,price,stock,description,category));
    };
    useEffect(() => {
        if(products && products._id !==id){
            dispatch(getProductDetails(id));
        }else{
            setName(products.name);
            setPrice(products.price);
            setDescription(products.description);
            setCategory(products.category);
            setStock(products.Stock);
        }  

       // history.push("/admin/products");
        dispatch({ type: UPDATE_PRODUCT_RESET });
    


}, [dispatch, history , id , products]);
    return (
        <Fragment>
            <MetaData title="Product edit" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form className="createProductForm"
                        encType="multipart/fome-data"
                        onSubmit={createProductSubmitHandeler}>
                        <h1>Update Product</h1>

                        <div>
                            <input
                                type="text"
                                placeholder='Product Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder='Product Price'
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder='Product Stock'
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder='Product Description'
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categorys.map((item) => {
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                })}
                            </select>
                        </div>

                        <Link to="/admin/products"><input type="submit" className="createproductbutton" ></input></Link>
                        
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProduct
