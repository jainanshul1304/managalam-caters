const Order = require("../models/orderModels");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middlerware/catchAsyncError");
const Product = require("../models/productModel");



//create a new order 
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;

    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id,
    });

    res.status(201).json({
        sucess: true,
        order,
    });
});

//get Single Oreder -----------admin
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    pr
    res.status(200).json({
        sucess: true,
        order,
    });
});

//Myorder ------------logiinf user order

exports.myOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        sucess: true,
        orders,
    });
});

// get all orders by------------admin

exports.getAllOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        sucess: true,
        totalAmount,
        orders,
    });
});

// update order status ----------Admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new Errorhandler("order not found with this id", 404));
    }

    if (order.orderStatus === "Deliverd") {
        return next(new Errorhandler("You already deleverd this product", 400));
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.Product, order.quantity);
    });

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });


    res.status(200).json({
        sucess: true,

    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

//  Delete / Cancel order

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.findById(req.params.id);



    if (!orders) {
        return next(new Errorhandler("You already deleverd this product", 404));
    }
    await orders.remove();

    res.status(200).json({
        sucess: true,

    });
});





