const Post = require("../models/post");
const User = require("../models/user");
const postService = require("../services/post");

const createUser = async (fName, lName, username, password, profileImg) => {
  const user = new User({ fName, lName, username, password, profileImg });
  const check = await User.findOne({ username: username });
  if (check) return false;
  await user.save();
  return true;
};

const getUsers = async () => {
  return await User.find({});
};

const getUserByuName = async (uName) => {
  return await User.findOne({ username: uName });
};
const updateUser = async (id, password, profileImg) => {
  const user = await getUserByuName(id);
  if (!user) return null;
  user.password = password;
  user.profileImg = profileImg;
  await user.save();
  return user;
};

const deleteUser = async (id) => {
  const user = await getUserByuName(id);
  if (!user) return null;

  // Remove the user from other users' pending lists
  await User.updateMany(
    { pending: user.username },
    { $pull: { pending: user.username } }
  );

  // Remove the user from other users' friends lists
  await User.updateMany(
    { friends: user.username },
    { $pull: { friends: user.username } }
  );

  // Delete all posts authored by the user
  await Post.deleteMany({ author: id });

  // Delete the user
  await user.deleteOne();

  return user;
};

const getFriends = async (id) => {
  const user = await getUserByuName(id);
  if (!user) return null;
  return user.friends;
};
const acceptFriend = async (id, friendId) => {
  const user = await getUserByuName(id);
  const friend = await getUserByuName(friendId);
  
  if (!user || !friend) return null;
  
  // Check if friendId is in the pending list
  const isFriendPending = user.pending.includes(friend.username);
  if (!isFriendPending) return null; // If not found, return null
  
  // Remove friend.username from user.pending using filter
  user.pending = user.pending.filter(username => username !== friend.username);
  
  // Add friend.username to user.friends and user.username to friend.friends
  user.friends.push(friend.username);
  friend.friends.push(user.username);
  
  // Save changes to the database
  await user.save();
  await friend.save();
  
  return true;
};

const rejectFriend = async (id, friendId) => {
  const user = await getUserByuName(id);
  const friend = await getUserByuName(friendId);
  
  if (!user || !friend) return null;
  
  if (user.pending.includes(friend.username)) {
    // Remove friend.username from user.pending using filter
    user.pending = user.pending.filter(username => username !== friend.username);
  } else {
    // Remove friend.username from user.friends using filter
    user.friends = user.friends.filter(username => username !== friend.username);
    // Remove user.username from friend.friends using filter
    friend.friends = friend.friends.filter(username => username !== user.username);
  }

  // Save changes to the database
  await user.save();
  await friend.save();

  return true;
};

const pendingFriend = async (id, friendId) => {
  const user = await getUserByuName(id);
  const friend = await getUserByuName(friendId);
  if (!user || !friend) return null;
  friend.pending.push(user.username);
  friend.save();
  return true;
};

const getNonFriendAuthors = async (username) => {
  const user = await getUserByuName(username);
  if (!user) return null;
  const friends = await getFriends(user._id);
  const nonFriendAuthors = await User.find({
    _id: { $nin: friends.concat(user._id) },
  }).distinct("username");
  return nonFriendAuthors;
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getFriends,
  acceptFriend,
  rejectFriend,
  pendingFriend,
  getUserByuName,
  getNonFriendAuthors,
};
