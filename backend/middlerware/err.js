const Errorhandler = require("../utils/errorhandler");

module.exports = (err, req, res,next)=>{
    err.statuscode = err.statuscode || 500 ;
    err.message = err.message || "Internal server error";
    

    //wrong mongodb id error
    if(err.name==="castError"){
        
        err = new Errorhandler(`Resource not found Invalid:${err.path}`,404);
    }
    
    //MOngodb duplicate key error
    if(err.code===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered` ;
        err= new(Errorhandler(message,400));
    }

    //Wrong JWt wrror
    if(err.name==="jsonWebTokenError"){
        const message = `Json web token invalid , try again` ;
        err= new(Errorhandler(message,400));
    }

    //JWT expire token 
    if(err.name==="tokenExpireError"){
        const message = `Json web token Expired , try again` ;
        err= new(Errorhandler(message,400));
    }

   
    res.status(err.statuscode).json({
        sucess:false,
        message:err.message
    });
};