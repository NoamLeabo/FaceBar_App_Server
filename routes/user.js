const userController = require("../controllers/user");
const postController = require("../controllers/post");
const { isLoggedIn } = require("../controllers/tokens");

const express = require("express");
var router = express.Router();

router.route("/").post(userController.createUser).get(isLoggedIn, userController.getUsers);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(isLoggedIn, userController.updateUser)
  .delete(isLoggedIn, userController.deleteUser);

router
  .route("/:id/posts")
  .get(isLoggedIn, postController.getUserPosts)
  .post(isLoggedIn, postController.createPost);

router
  .route("/:id/posts/:pid")
  .patch(isLoggedIn, postController.updatePost)
  .delete(isLoggedIn, postController.deletePost)
  .post(isLoggedIn, postController.likePost);

router
  .route("/:id/friends")
  .get(isLoggedIn, userController.getFriends)
  .post(isLoggedIn, userController.pendingFriend);

router
  .route("/:id/friends/:fid")
  .patch(isLoggedIn, userController.acceptFriend)
  .delete(isLoggedIn, userController.rejectFriend);

module.exports = router;
