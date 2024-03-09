// import jwt from "jsonwebtoken";

const express = require("express");
var app = express();

// const jwt = require("jsonwebtoken");
// const key = "Menashe";

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(cors());

const customEnv = require("custom-env");
customEnv.env(process.env.NODE_ENV, "./config");
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static("public"));

const posts = require("./routes/post");
const users = require("./routes/user");
const tokens = require("./routes/tokens");

app.use("/posts", posts);
app.use("/user", users);
app.use("/tokens", tokens);

app.listen(process.env.PORT);
