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
  if (!user.pending.includes(friend.username)) return null;
  user.pending.pop(friend.username);
  user.friends.push(friend.username);
  friend.friends.push(user.username);
  user.save();
  friend.save();
  return true;
};

const rejectFriend = async (id, friendId) => {
  const user = await getUserByuName(id);
  const friend = await getUserByuName(friendId);
  if (!user || !friend) return null;
  if (user.pending.includes(friend.username)) {
    user.pending.pop(friend.username);
    user.save();
    friend.save();
    return true;
  } else {
    user.friends.pop(friend.username);
    friend.friends.pop(user.username);
    user.save();
    friend.save();
    return true;
  }
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
