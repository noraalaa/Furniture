var mongoose = require("mongoose");

var schema = mongoose.Schema;
var user = new schema({
  ID: {
    type: Number,
    unique: true,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    unique: true,
    required: true
  },
  Password: {
    type: String,
    min: 5,
    required: true
  },
  CreateDate: {
    type: Date,
    default: Date.now
  },
  Gender: {
    type: String,
    required: true,
    enum: ["female", "male"]
  },
  MilitaryService: {
    type: String,
    default: false
  },
  DateOfBirth: {
    type: String,
    required: true
  },
  Role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  }
});


module.exports = mongoose.model("User", user);