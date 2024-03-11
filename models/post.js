const { json } = require("body-parser");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema({
  author: {
    type: String,
    required: true,
  },

  published: {
    type: Date,
    default: Date.now,
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
});

module.exports = mongoose.model("Post", Post);
