const userService = require("../services/user");
const jwt = require("jsonwebtoken");
const key = "Menashe";

const isLoggedIn = (req, res, next) => {
  // If the request has an authorization header
  if (req.headers.authorization) {
    // Extract the token from that header
    const token = req.headers.authorization.split(" ")[1];
    try {
      // Verify the token is valid
      const data = jwt.verify(token, key);
      console.log("The logged in user is: " + data.username);
      // Token validation was successful. Continue to the actual function (index)
      return next();
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  } else return res.status(403).send("Token required");
};

const generateToken = async (req, res) => {
  const user = await userService.getUserByuName(req.body.username);
  // Check credentials
  if (req.body.password == user.password) {
    // Correct username and password - Yayyyy
    // We now want to generate the JWT.
    // The token can contain whatever information we desire.
    // However, do not put sensitive information there, like passwords.
    // Here, we will only put the *validated* username
    const data = { username: req.body.username };
    // Generate the token.
    const token = jwt.sign(data, key);
    // Return the token to the browser
    res.status(201).json({ token });
  }
  // Incorrect username/password. The user should try again.
  else res.status(404).send("Invalid username and/or password");
};

module.exports = {
  isLoggedIn,
  generateToken,
};
