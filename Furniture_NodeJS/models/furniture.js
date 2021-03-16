var mongoose = require("mongoose");

var schema = mongoose.Schema;
var furniture = new schema({
    ID:{type:Number, unique:true,required: true},
    Name:{type:String,required: true},
    Image:{type:String,required: true},
    Description:{type:String,required: true},
    Collection:{type:String,required: true},
    Price:{type:Number,required: true}
});

//
module.exports = mongoose.model("Furniture",furniture);