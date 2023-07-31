const app = require("./app");
//const dotenv = require("dotenv");
const cloudinary = require('cloudinary');
const connectDatabase = require("./config/database");

//Handeling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("UncaughtExceptions on the server");
    process.exit(1);
})
//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
}

//Always call db after dotenv file 


//Uncaught Exception
//console.log(you);

connectDatabase() ;
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET, 
});

const server = app.listen(process.env.PORT , ()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})


// unhandledRejection error ----------come when server become crash
// process.on() is a method , from the node.js process ............used to regester event listener for the specific event emitted....
process.on("unhandledRejection" ,(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandle promise rejection");

    server.close(()=>{
        process.exit(1);
    });
});


