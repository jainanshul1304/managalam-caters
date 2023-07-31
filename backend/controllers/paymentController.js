const catchAsyncError = require("../middlerware/catchAsyncError");

const stripe  = require("stripe")(process.env.STRIPE_API_KEY);

exports.processPayment = catchAsyncError(async(req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"Inr",
        
    });
    res.status(200).json({sucess:true , client_secret:myPayment.client_secret});    
})


exports.sendStripeApiKey = catchAsyncError(async(req,res,next)=>{
    res.status(200).json({stripeApiKey : process.env.STRIPE_API_KEY});
})