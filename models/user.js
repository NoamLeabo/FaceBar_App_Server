// require mongoose module
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create a new schema for the user
const User = new Schema({
  // define the schema properties

  // first name of the user
  fName: {
    type: String,
    required: true,
  },

  // last name of the user
  lName: {
    type: String,
    required: true,
  },

  // username of the user
  username: {
    type: String,
    required: true,
  },

  // password of the user
  password: {
    type: String,
    required: true,
  },

  // jwt token of the user
  jwt: {
    type: String,
    default: 0,
  },

  // profile image of the user
  profileImg: {
    type: String,
  },

  // posts of the user
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  // friends of the user
  friends: [
    {
      type: String,
    },
  ],

  // friend requests of the user
  pending: [
    {
      type: String,
    },
  ],
});

// export the schema
module.exports = mongoose.model("User", User);
