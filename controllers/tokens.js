const userService = require("../services/user");
const jwt = require("jsonwebtoken");
const key = "Menashe";

const isLoggedIn = (req, res, next) => {
  // if (req.cookies.authorization) {
  //   // Extract the token from that header
  //   const token = req.cookies.authorization;
  //   try {
  //     // Verify the token is valid
  //     const data = jwt.verify(token, key);
  //     console.log("The logged in user is: " + data.username);
  //     // Token validation was successful. Continue to the actual function (index)
  //     return next();
  //   } catch (err) {
  //     return res.status(401).send("Invalid Token");
  //   }
  // } else return res.status(403).send("Token required");
  //////////////////////////////////////////////////////////
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const data = jwt.verify(token, key);
      console.log("The logged in user is: " + data.username);
      // res.redirect("/home");
      // Token validation was successful. Continue to the actual function (index)
      return next();
    } catch (err) {
      console.log("error in token");
      return res.status(401).send("Invalid Token");
    }
  } else return res.status(403).send("Token required");
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
      res.status(201).json({ token });
    }
    // Incorrect username/password. The user should try again.
    else res.status(404).send("Invalid username and/or password");
  }
};

module.exports = {
  isLoggedIn,
  generateToken,
};
