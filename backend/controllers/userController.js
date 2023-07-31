const User = require("../models/userModels");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middlerware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require('cloudinary');
//Regester a user

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    /*
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar , {
        folder:"avaters",
        width:150,
        crop:"scale",
    });
    */
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "myCloud.public_id",
            public_url: "myCloud.secure_url"
        },
    });
    /*
        const token = user.getJWTToken();
    
        res.status(201).json({
            sucess: true,
            token
        })
     */
    sendToken(user, 201, res);

})


//Login a User

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new Errorhandler("Please enter a email & password", 404));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new Errorhandler("Invalid email & password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new Errorhandler("Invalid email & password", 401));
    }
    /*
        const token = user.getJWTToken();
    
        res.status(200).json({
            sucess: true,
            token
        })
    */
    sendToken(user, 200, res);
})

exports.logOut = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        sucess: true,
        message: "Logout Sucessfully"
    });
});

//Forgot Password handle
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new Errorhandler("user not found", 404));
    }
    //get Reset Token 
    const resetToken = user.getResetPassowrdToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is :-\n\n ${resetPasswordUrl} \n\n If you not request for this email then please ignore it..`;


    try {

        await sendEmail({
            email: user.email,
            subject: "password recovery from Ecomers website",
            message
        });

        res.status(200).json({
            sucess: true,
            message: `Email send to ${user.email} sucessfully`
        });


    } catch (error) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(500).json({
            sucess: false,
            message: error.message
        });
    }

});


//Get user Details in HER/HIM Profile
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        sucess: true,
        user
    });
});

//update user password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return res.status(400).json({
            sucess: false,
            message: "Old password not matched"
        })
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new Errorhandler("confirm password not matched", 400));
    }
    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);


})

// update user profile

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserDetails = {
        name: req.body.name,
        email: req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserDetails, {
        new: true,
        runValidators: false,
        userFindAndModify: false
    });
    res.status(200).json({
        sucess: true,
        message: "Profile updated sucessfuly"
    })
})


//Get all user ---------(admin)

exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const user = await User.find();

    res.status(200).json({
        sucess: true,
        user
    });
});

//Get single user

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = User.findById(req.params.id);

    if (!user) {
        res.status(404).json({
            sucess: false,
            message: "Not get details "
        })

    }
    res.status(200).json({
        sucess: true,
        user
    });
})

//update user Role and profile by Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserDetails = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserDetails, {
        new: true,
        runValidators: false,
        userFindAndModify: false
    });
    res.status(200).json({
        sucess: true,
        message: "Profile updated sucessfuly"
    })
})

//Delete user by admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = User.findById(req.params.id);
    if (!user) {
        res.status(404).json({
            sucess: false,
            message: "Not get details "
        })
    }

    await user.remove();

    res.status(200).json({
        sucess: true,
        user
    });
})



