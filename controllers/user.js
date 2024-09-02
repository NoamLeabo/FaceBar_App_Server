// require the mongoose module
const { get } = require("mongoose");
// requiring the user services
const userService = require("../services/user");

// function to create a user
const createUser = async (req, res) => {
  // create the user and return a response
  const user = await userService.createUser(
    req.body.fName,
    req.body.lName,
    req.body.username,
    req.body.password,
    req.body.profileImg
  );
  if (!user) {
    // if the user already exists, return a 400 status code
    return res.status(400).json({ errors: ["User already exists"] });
  }
  // if the user is created, we indicate so
  res.json({ message: "User created" });
};

// function to get all users
const getUsers = async (req, res) => {
  // return all users as a response
  res.json(await userService.getUsers());
};

// function to get a user by their username (id)
const getUserById = async (req, res) => {
  // get the user by their username and return it as a response
  const user = await userService.getUserByuName(req.params.id);
  if (!user) {
    // if the user is not found, return a 404 status code
    return res.status(404).json({ errors: ["User not found"] });
  }
  res.json(user);
};

// function to update a user
const updateUser = async (req, res) => {
  // update the user info and return it as a response
  const user = await userService.updateUser(
    req.params.id,
    req.body.password,
    req.body.profileImg
  );
  if (!user) {
    // if the user is not found, return a 404 status code
    return res.status(404).json({ errors: ["User not found"] });
  }
  res.json(user);
};

// function to delete a user
const deleteUser = async (req, res) => {
  // delete the user and return it as a response
  const user = await userService.deleteUser(req.params.id);
  if (!user) {
    // if the user is not found, return a 404 status code
    return res.status(404).json({ errors: ["User not found"] });
  }
  res.json(user);
};

// function to get all friends of a user
const getFriends = async (req, res) => {
  // get the user by his username
  const user = await userService.getUserByuName(req.params.id);
  if (!user) {
    // if the user is not found, return a 404 status code
    return res.status(404).json({ errors: ["User not found"] });
  }
  // return the friends of the user as a response
  res.json(await userService.getFriends(req.params.id));
};

// function to send a friend request
const pendingFriend = async (req, res) => {
  // extract the requesting user id (id) and the requested user id (fid) from the request
  const fid = req.params.id;
  const id = req.body.fid;
  // send the friend request and return it as a response
  const acc = await userService.pendingFriend(id, fid);
  if (!acc) {
    // if the user is not found, return a 404 status code
    return res.status(404).json({ errors: ["User not found"] });
  }
  res.json({ message: "Friend request sent" });
};

// function to accept a friend request
const acceptFriend = async (req, res) => {
  // accept the friend request and return it as a response
  const acc = await userService.acceptFriend(req.params.id, req.params.fid);
  if (!acc) {
    // if the user is not found, return a 404 status code
    return res.status(404).json({ errors: ["User not found"] });
  }
  res.json({ message: "Friend request accepted" });
};

// function to reject a friend request
const rejectFriend = async (req, res) => {
  // reject the friend request and return it as a response
  const rej = await userService.rejectFriend(req.params.id, req.params.fid);
  if (!rej) {
    // if the user is not found, return a 404 status code
    return res.status(404).json({ errors: ["User not found"] });
  }
  res.json({ message: "Friend has been rejected" });
};

// export the functions
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getFriends,
  pendingFriend,
  acceptFriend,
  rejectFriend,
};
