const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  fName: {
    type: String,
    required: true,
  },

  lName: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  jwt: {
    type: String,
    default: 0,
  },

  profileImg: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  friends: [
    {
      type: String,
    },
  ],
  pending: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", User);
