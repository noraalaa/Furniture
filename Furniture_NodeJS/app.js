const express = require("express"); 
const fs = require("fs");
const bodyparser = require("body-parser");
const routefurniturer = require("./routes/furniturer");
const routeuser = require("./routes/user");
const routeauth = require("./routes/auth");
const cors = require("cors");


//server
const app = express();
app.use(cors());

// load driver for mongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shopDB",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

//
var files_arr = fs.readdirSync(__dirname+"/models");
files_arr.forEach(function(file){
    require(__dirname+"/models/"+file);
});

app.use(bodyparser.json({extended:false}));


app.use('/furniturer',routefurniturer);
app.use('/user',routeuser);
app.use('/auth',routeauth);


app.use((req,resp,next)=>{
    resp.send("Hello page not found");
});

app.listen(3000);