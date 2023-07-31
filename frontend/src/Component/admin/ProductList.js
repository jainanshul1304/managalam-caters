import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Loader from '../Loader/Loader';
import { getAdminProduct ,adminProductDelete, updateProduct } from '../../actions/productActions';
import "./ProductList.css";
import del from "../../image/delete.jpeg" ;
import edit from "../../image/edit.jpeg";
import { useParams } from 'react-router-dom';
import { deleteProduct } from '../../actions/productActions';
import { createBrowserHistory } from 'history';
const ProductList = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = createBrowserHistory();
    const { products, loading } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getAdminProduct());
    }, [dispatch]);

  
    const deleteProductHandeler= (id)=>{
        dispatch(deleteProduct(id))
    }
    const editProductHandeler =(id)=>{
        dispatch(updateProduct(id));
       history.push(`/admin/products/${id}`);
        
    }
    /*
    const coloum = [
        { field: id, headerName: "Product_Id", minWidth: 200, flex: 0.5 },
        { field: "name ", headerName: "Name", minWidth: 200, flex: 0.5 },
        { field: "stock", headerName: "Stock", minWidth: 200, type: "number", flex: 0.5 },
        { field: "Price", headerName: "Price", type: "number", minWidth: 200, flex: 0.5 },
        {
            field: "Action", flex: 0.3, headerName: "ACtion", type: "number", minWidth: 200,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`} />
                        <img src={edit} alt="Edit" />
                        <button>
                            <img src={dele} alt="delete" />
                        </button>
                    </Fragment>
                )
            }
        }
    ];
    */
    const rows = [];

    
    
    return (
        <Fragment>
            <div className="dashboard">
                <Sidebar />
                {
                    loading ? (<Loader />) : (

                        <div className="myorderspge">
                            <h2>All Products</h2>
                            <div className='container2'>

                                <div class="col-4">
                                    Product ID
                                </div>
                                <div class="col-2">
                                    Name
                                </div>
                                <div class="col-2">
                                    Stock
                                </div>
                                <div class="col-3">
                                    Price
                                </div>
                                <div class="col-1">
                                    Action
                                </div>
                            </div>
                            
                            {
                                products && products.map((item) => (
                                    <div col-3>
                                        <p>{item._id}</p>
                                        <p>{item.name}</p>
                                        <p>{item.Stock}</p>
                                        <p>{item.price}</p>
                                        <p><img src={del} alt="delete" onClick={()=>deleteProductHandeler(item._id)}/></p>
                                        <p><img src={edit} alt="edit" onClick={()=>editProductHandeler(item._id)}/></p>
                                    </div>

                                ))
                            }
                            
                        </div>
                    )
                }




            </div>
        </Fragment>
    )
}

export default ProductList
