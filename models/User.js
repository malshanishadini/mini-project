const mongoose = require("mongoose");
const shortid = require('shortid');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  userID: {
    type: String,
    default: shortid.generate
  },
  title: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }, 
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  avatarURL: {
    type: String
  },
  enableFlag: {
    type: Boolean,
    default: false
  },
  userLevel: {
    type: String,
    required: true  
  },
  createdDate:{
    type:Date,
    default:Date.now
  }

  // updatedDate:Date, 
});

module.exports = User = mongoose.model("users", UserSchema);


