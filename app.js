// import jwt from "jsonwebtoken";

const express = require("express");
var app = express();

// const jwt = require("jsonwebtoken");
// const key = "Menashe";
const http = require("http");

const server = http.createServer({ maxHttpHeaderSize: 65536 }, app);

const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
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

app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/tokens", tokens);

app.get("*", function (req, res) {
  res.redirect("/");
});

const net = require('net');
const client = new net.Socket();
client.connect(process.env.TCP_PORT, process.env.TCP_ADDRESS, () => {
  console.log('Connected to TCP server');
  client.write(process.env.BF_INIT);
});

client.on('data', (data) => {
  console.log('Received data:', data.toString());
});

client.on('end', () => {
  console.log('Connection closed');
  client.destroy();
});

app.listen(process.env.PORT);