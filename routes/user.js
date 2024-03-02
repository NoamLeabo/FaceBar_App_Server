const userController = require("../controllers/user");

const express = require("express");
var router = express.Router();

router.route("/").post(userController.createUser).get(userController.getUsers);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUserPassword)
  .delete(userController.deleteUser);

router
  .route("/:id/friends")
  .get(userController.getFriends)
  .post(userController.addFriend);

module.exports = router;
