// require mongoose module
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create a new schema for the post
const Post = new Schema({
  // define the schema properties

  // author of the post
  author: {
    type: String,
    required: true,
  },

  // profile picture of the author
  profilePic: {
    type: String,
  },

  // date the post was published
  published: {
    type: String,
  },

  // content of the post
  content: {
    type: String,
    required: true,
  },

  // number of likes the post has
  numOfLikes: {
    type: Number,
    default: 0,
  },

  // number of comments the post has
  numOfComments: {
    type: Number,
    default: 0,
  },

  // image of the post
  imageView: {
    type: String,
  },

  // comments on the post
  commentsInt: [
    {
      type: Number,
    },
  ],

  // users who liked the post
  usersWhoLiked: [
    {
      type: String,
    },
  ],
});

// export the schema
module.exports = mongoose.model("Post", Post);
