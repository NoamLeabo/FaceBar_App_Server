const tokensController = require("../controllers/tokens");

const express = require("express");
var router = express.Router();



router.route("/").post(tokensController.generateToken);

module.exports = router;
