// requiring the tokens controller
const tokensController = require("../controllers/tokens");

// requiring the express module and assigning it to the variable 'express'
const express = require("express");
// assigning the express.Router function to the variable 'router'
var router = express.Router();

// using the router to handle a request of generating a token
router.route("/").post(tokensController.generateToken);

// exporting the router
module.exports = router;
