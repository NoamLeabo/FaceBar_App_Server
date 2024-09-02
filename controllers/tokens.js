// require the user service
const userService = require("../services/user");
// require the jsonwebtoken module
const jwt = require("jsonwebtoken");
// set the key for the token to be "Menashe"
const key = "Menashe";

// function to check if the given user is logged in
const isLoggedIn = (req, res, next) => {
  // check if the user has a token
  if (req.headers.authorization) {
    // get the token from the headers
    const token = req.headers.authorization.split(" ")[1];
    try {
      // verify the token
      const data = jwt.verify(token, key);
      // if the token is verified, call the next middleware
      return next();
    } catch (err) {
      // if the token is not verified, return a 401 status code
      res.status(401);
      // redirect the user to the root route
      return res.redirect("/");
    }
  } else {
    // if the user doesn't have a token, return a 403 status code
    res.status(403);
    // redirect the user to the root route
    return res.redirect("/");
  }
};

// function to generate a token for the user
const generateToken = async (req, res) => {
  // get the user by the given username
  const user = await userService.getUserByuName(req.body.username);
  // if the user exists
  if (user) {
    // check if the given password is correct
    if (req.body.password == user.password) {
      // create an object with the username
      const data = { username: req.body.username };
      // generate the token with the object and the key
      const token = jwt.sign(data, key);
      // return the token as a response
      res.status(201).json(token);
    }
    // if the password is incorrect, return a 404 status code
    else res.status(404).send("Invalid username and/or password");
  }
  // if the user doesn't exist, return a 404 status code
  else res.status(404).send("Invalid username and/or password");
};

// export the functions
module.exports = {
  isLoggedIn,
  generateToken,
  key,
};
