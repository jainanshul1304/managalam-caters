import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css";
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, clearErrors } from '../actions/productActions';
import Loader from './Loader/Loader';
import Product from './Product';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Search from './Search/Search';
import ProductDetails from './Product/ProductDetails';

const Products = ({ match }) => {
  const categories = [
    "Laptop",
    "Phone",
    "shirt222",
    "Chair",
    "Sweet",
  ];
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

/*
  const setCurrentCategory =()=>{
    dispatch(getProduct(category));
  }
  */
  const setCurrentPageNo = (e) => {

    setCurrentPage(e);
  }

  const { products, error, loading, resultPerPage, productsCount } = useSelector(
    (state) => state.products
  );

  const {id} = useParams();
  //const keyword = book.keyword ;

  useEffect(() => {
    dispatch(getProduct(currentPage, category ,id))
  
  }, [dispatch, currentPage, category,id]);
 

  return (
    <Fragment>

      <div className="category">
        <h2>Category</h2>
        <ul className="categoryBox">
          {categories.map((category) =>
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
              
            >
              {category}
              
            </li>
          )}
        </ul>
      </div>


      {loading ? (<Loader />) : <Fragment>
        <h2 className="productHading">Products</h2>
        <div className="container" id="container">
          {products && products.map((product) => <Product product={product} />)}

        </div>




        {
          resultPerPage < productsCount && (
            <div className="pagination">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )
        }
      </Fragment>
      }
    </Fragment>

  )
}

export default Products
