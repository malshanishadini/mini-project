const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  postID: {
    type: String
  },
  userID: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }, 
  categoryID: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  publish: {
    type: String,
    required: true
  },
  createdDate:{
    type:Date,
    default:Date.now
}
});

module.exports = Post = mongoose.model("posts", PostSchema);



