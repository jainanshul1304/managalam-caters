const mongoose = require("mongoose");
const User = require("./userModels");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    price: {
        type: String,
        required: [true, "Please Enter the price"],
        maxLength: [8, "Price cann't excede above 8 char"]
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [
        
        {
            public_id: {
                type: String,
                required: true
            },
            public_url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    Stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4, "Stock cann't excede 4 char"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                required: [true, "Please enter your name"],
                ref:"User"
            },
            name: {
                type: String,
                required: [true, "Please enter your name"],
                trim: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    createAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Product", productSchema) ;