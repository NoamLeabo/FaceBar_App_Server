// requiring module 'express' and assigning it to variable 'express'
const express = require("express");
// assigning the express function to the variable 'app'
var app = express();

// requiring module 'http' and assigning it to variable 'http'
const http = require("http");

// creating a server with the express app
const server = http.createServer({ maxHttpHeaderSize: 65536 }, app);
// require the body-parser module
const bodyParser = require("body-parser");

// using the body-parser middleware
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 500000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(express.json({ limit: "500mb", extended: true }));

// requiring module 'cookie-parser' and assigning it to variable 'cookieParser'
const cookieParser = require("cookie-parser");
// using the cookie-parser middleware
app.use(cookieParser());

// requiring module 'cors' and assigning it to variable 'cors'
const cors = require("cors");
// using the cors middleware
app.use(cors());

// requiring module 'custom-env' and assigning it to variable 'customEnv'
const customEnv = require("custom-env");
// using the customEnv middleware
customEnv.env(process.env.NODE_ENV, "./config");
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

// requiring module 'mongoose' and assigning it to variable 'mongoose'
const mongoose = require("mongoose");
// connecting to the database server
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// using the express middleware to serve static files
app.use(express.static("public"));

// attaching the app routes to handle requests
const posts = require("./routes/post");
const users = require("./routes/user");
const tokens = require("./routes/tokens");

// using the app routes
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/tokens", tokens);

// any other route will be redirected to the root route
app.get("*", function (req, res) {
  res.redirect("/");
});

// connecting the TCP server
const net = require("net");
const client = new net.Socket();
client.connect(process.env.TCP_PORT, process.env.TCP_ADDRESS, () => {
  console.log("Connected to TCP server");
  client.write(process.env.BF_INIT);
});

// initializing the blacklist of urls in TCP server
client.on("data", (data) => {
  client.write(process.env.BLACK_URLS);
});

// handling the clouser of the TCP server connection
client.on("end", () => {
  console.log("Connection closed");
  client.destroy();
});

// start running the server
app.listen(process.env.PORT);
