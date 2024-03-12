const { json } = require("body-parser");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema({
  author: {
    type: String,
    required: true,
  },

  profilePic: {
    type: String
  },

  published: {
    type: String
  },

  content: {
    type: String,
    required: true,
  },

  numOfLikes: {
    type: Number,
    default: 0,
  },

  numOfComments: {
    type: Number,
    default: 0,
  },

  imageView: {
    type: String,
  },
  
  commentsInt: [{
    type: Number
}],
  usersWhoLiked: [{
    type: String,
}],
});

module.exports = mongoose.model("Post", Post);
