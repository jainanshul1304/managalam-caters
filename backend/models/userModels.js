const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please enter your name"],
        maxLength:[20 ,"name cann't excede above 20"],
        minLength:[4 , "minimium name length is 4 "]
    },
    email:{
        type:String,
        require:[true,"Please enter your email"],
        unique:true,
        validator:validator.isEmail
    },
    password:{
        type:String,
        require:[true,"Please enter your password"],
        minLength:[8,"password should have min 8 length"],
        select:false
    },
    avatar:{
        public_id: {
            type: String,
            required: true
        },
        public_url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

//passowrd bcrypt 
userSchema.pre("save",async function(next){
   if(!this.isModified("password")){
    next();
   }

    this.password = await bcrypt.hash(this.password , 10);
})
//Jwt Token 
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id} , process.env.JWT_SECRET ,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}
//cpmapre password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
};

// Reset auth token

userSchema.methods.getResetPassowrdToken = function(){
    //Generate Token by Cryptography 
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetpassword to user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire =Date.now()+ 15*60*1000 ;

    return resetToken ;

}



module.exports = mongoose.model("User", userSchema);
