const userService = require("../services/user");
const jwt = require("jsonwebtoken");
const key = "Menashe";

const isLoggedIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const data = jwt.verify(token, key);
      return next();
    } catch (err) {
      res.status(401);
      return res.redirect("/");
    }
  } else {
    res.status(403);
    return res.redirect("/");
  }
};


const generateToken = async (req, res) => {
  const user = await userService.getUserByuName(req.body.username);
  // Check credentials
  if (user) {
    if (req.body.password == user.password) {
      const data = { username: req.body.username };
      // Generate the token.
      const token = jwt.sign(data, key);
      // Return the token to the browser
      //res.cookie("authorization", token);
      res.status(201).json(token);
    }
    // Incorrect username/password. The user should try again.
    else res.status(404).send("Invalid username and/or password");
  } 
  else res.status(404).send("Invalid username and/or password");
};

module.exports = {
  isLoggedIn,
  generateToken,
};
