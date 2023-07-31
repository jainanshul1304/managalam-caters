import { Component ,Fragment } from "react";
import React from 'react'

class SearchProduct extends Component {
    constructor(){
        super()
        this.state={
            searchData:null
        }
    }
    search(key){
        console.log(key)
        fetch("http://localhost:4000/api/v1/products/?keyword="+key).then((data)=>{
            data.json()}).then((res)=>{
                console.log(res)
                this.setState({searchData:res})
            })
        
    }
    render() {
        return (
           <div>
            <input type="text" onChange={(event)=>
                this.search(event.target.value)
            }/>
            <div>
                {
                    this.state.searchData?
                    <div>
                        {
                            this.state.searchData.map((item)=>
                                <div>{item.name}</div>
                            )
                        }
                    </div>
                    :""    
                }
            </div>
           </div>
        )
    }
}

export default SearchProduct
