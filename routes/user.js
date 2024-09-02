// requiring the user controller
const userController = require("../controllers/user");
// requiring the post controller
const postController = require("../controllers/post");
// requiring the isLoggedIn function from the tokens controller
const { isLoggedIn } = require("../controllers/tokens");

// requiring the express module and assigning it to the variable 'express'
const express = require("express");
// assigning the express.Router function to the variable 'router'
var router = express.Router();

// using the router to handle a general request to user router
router.route("/")
  // request of creating a user
  .post(userController.createUser)
  // request of getting all users
  .get(isLoggedIn, userController.getUsers);

// using the router to handle a request to the user router by user-id
router.route("/:id")
  // getting user by user-id
  .get(userController.getUserById)
  // updating user by user-id
  .patch(isLoggedIn, userController.updateUser)
  // deleting user by user-id
  .delete(isLoggedIn, userController.deleteUser);

// using the router to handle a request to the user's posts by user-id
router.route("/:id/posts")
  // getting posts of user by user-id
  .get(isLoggedIn, postController.getUserPosts)
  // creating a post for user by user-id
  .post(isLoggedIn, postController.createPost);

// using the router to handle a request to the user's posts by user-id and post-id
router.route("/:id/posts/:pid")
  // getting post of user by user-id and post-id
  .patch(isLoggedIn, postController.updatePost)
  // deleting post of user by user-id and post-id
  .delete(isLoggedIn, postController.deletePost)
  // liking post of user by user-id and post-id
  .post(isLoggedIn, postController.likePost);

// using the router to handle a request to the user's friends by user-id
router.route("/:id/friends")
  // getting friends of user by user-id
  .get(isLoggedIn, userController.getFriends)
  // creating a friend request for user by user-id
  .post(isLoggedIn, userController.pendingFriend);

// using the router to handle a request to the user's friends by user-id and friend-id
router.route("/:id/friends/:fid")
  // accepting friend request of user by user-id and friend-id
  .patch(isLoggedIn, userController.acceptFriend)
  // rejecting friend request of user by user-id and friend-id
  .delete(isLoggedIn, userController.rejectFriend);

// exporting the router
module.exports = router;
