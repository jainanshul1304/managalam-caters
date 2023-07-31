import React, { Fragment, useEffect, useState } from 'react'
import "./Search.css"
import { createBrowserHistory } from 'history';
import { useDispatch } from 'react-redux';
import { getProduct, getProductDetails, searchProduct } from '../../actions/productActions';

const Search = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState();
    const history = createBrowserHistory();


    const searchSubmitHandeler = async (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            //dispatch(searchProduct(keyword));
            //history.push("./products");
            /*
            const url =`http://localhost:4000/api/v1/products/?keyword=${keyword}` ;
            const data=await fetch(url);
            const res = data.json();
            console.log(res);
            */
        } //else { history.push(`./products`) }
        // window.location.reload();
    };

    useEffect(() => {
        dispatch(getProduct(keyword))

    }, [dispatch, keyword])

    return (
        <span>
            <Fragment><form class="input-group" onSubmit={searchSubmitHandeler}>
                <input
                    className="form"
                    type="text"
                    placeholder="search a product..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                
            </form>
            </Fragment>


        </span>
    )
}

export default Search
