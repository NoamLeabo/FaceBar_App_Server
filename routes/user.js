const userController = require("../controllers/user");
const postController = require("../controllers/post");


const express = require("express");
var router = express.Router();

router.route("/")
.post(userController.createUser)

router.route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route("/:id/posts")
  .get(userController.getUserById)
  .post(postController.createPost);

router.route("/:id/posts/:pid")
  .patch(postController.updatePost)
  .delete(postController.deletePost);

router.route('/:id/friends')
    .get(userController.getFriends)
    .post(userController.pendingFriend);

router.route('/:id/friends/:fid')
    .patch(userController.acceptFriend)
    .delete(userController.rejectFriend);

module.exports = router;
