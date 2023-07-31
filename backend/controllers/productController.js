const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middlerware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeature");
const user = require("../models/userModels")

//create products ---ADMIN
exports.createProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

//GET ALL PRODUCT

exports.getAllProducts = catchAsyncError(async (req, res) => {
    //res.send({message:"hiiiiii"})
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apifeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

    // let products = await apifeature.query; 
    //let filteredProductCount = Product.length;


    const products = await apifeature.query;                                //Product.find();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        //filteredProductCount,
    })
});

//admin get Product
exports.getAdminProducts = catchAsyncError(async (req, res) => {
    

    const products = await Product.find()

    res.status(200).json({
        success: true,
        products,
    })
});

//GEt PRODUCT DETAILS
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return /*res.status(500).json({
            success:false,
            message:"Not get product"
        })*/
        next(new Errorhandler("Product not found", 404));
    }
    await product.get(req.params.id, req.body, () => {
        return res.send("Get Detail of Product")
    });

    res.status(200).json({
        success: true,
        product
    })
});


//UPDATE THE PRODUCT ITEMS  -------ADMIN

exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModified: false
    });

    res.status(200).json({
        success: true,
        product
    })

});
//DELETE PRODUCT  ----------ADMIN

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.param.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted Sucessfully",
        product
    })
});
//DELETE PRODUCT BY ADMIN 
exports.deleteProducts = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.param.id);
    
    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted Sucessfully",
        product
    })
});
//Create PRoduct reviews

exports.createProductReviews = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,

    };
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) (rev.rating = rating)(rev.comment = comment);
        });
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;

    })
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    })
});

//Get all product reviews

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.quary.id);
    if (!product) {
        return next(new Errorhandler("Product not Found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

//Delete Revires

exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.quary.productId);

    if (!product) {
        return next(new Errorhandler("Product not Found", 404));
    }

    const review = product.reviews.filter(
        (rev) => rev._id.toString() !== req.quary.id.toString()
    );

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;

    })
    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.quary.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModified: false
        }
    );

    res.status(200).json({
        success: true,
        revires: product.revires,
    })
})






