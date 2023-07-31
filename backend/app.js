const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const path = require("path");

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))

//Route imports

/*
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://63ca9c2:1 Q localhost:3000");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
})
*/
app.use("/api/v1",require("./routes/productRoute")) ;
app.use("/api/v1",require("./routes/userRoute"));
app.use("/api/v1",require("./routes/orderRoute"));
app.use("/api/v1" , require("./routes/paymentRoute"));

//build
app.use(express.static(path.join(__dirname , "../fronted/build")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname , "../fronted/build/index.html"));
})

module.exports = app 