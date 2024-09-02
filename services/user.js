// require post model
const Post = require("../models/post");
// require user model
const User = require("../models/user");

// function to create a user in the database
const createUser = async (fName, lName, username, password, profileImg) => {
  // create a new user object
  const user = new User({ fName, lName, username, password, profileImg });
  // check if the username already exists
  const check = await User.findOne({ username: username });
  // if the username already exists, return false
  if (check) return false;
  // save the user in the database
  await user.save();
  // return true
  return true;
};

// function to get all users from the database
const getUsers = async () => {
  return await User.find({});
};

// function to get a user by their username
const getUserByuName = async (uName) => {
  // get the user by their username and return it
  return await User.findOne({ username: uName });
};

// function to update a user info in the database
const updateUser = async (id, password, profileImg) => {
  // get the user by their username
  const user = await getUserByuName(id);
  // if the user does not exist, return null
  if (!user) return null;
  // update the user's password and profile image
  if (password != "") {
    // if the password is not empty, update it
    user.password = password;
  }
  user.profileImg = profileImg;
  // make sure to update the profilePic field in all posts authored by that user
  await Post.updateMany({ author: id }, { profilePic: profileImg });
  // save the updated user in the database
  await user.save();
  // return the updated user
  return user;
};

// function to delete a user from the database
const deleteUser = async (id) => {
  // get the user by their username
  const user = await getUserByuName(id);
  // if the user does not exist, return null
  if (!user) return null;
  // remove the user from all friends' pending lists
  await User.updateMany(
    { pending: user.username },
    { $pull: { pending: user.username } }
  );

  // remove the user from other users' friends lists
  await User.updateMany(
    { friends: user.username },
    { $pull: { friends: user.username } }
  );

  // delete all posts authored by the user
  await Post.deleteMany({ author: id });

  // delete the user
  await user.deleteOne();
  // return the deleted user
  return user;
};

// function to get all friends of a user
const getFriends = async (id) => {
  // get the user by their username
  const user = await getUserByuName(id);
  // if the user does not exist, return null
  if (!user) return null;
  // return the friends of the user
  return user.friends;
};

// function to accept a friend request
const acceptFriend = async (id, friendId) => {
  // get the user by their username
  const user = await getUserByuName(id);
  // get the friend requesting user by their username
  const friend = await getUserByuName(friendId);
  // if the user or the friend does not exist, return null
  if (!user || !friend) return null;

  // check if friendId is indeed in the pending list
  const isFriendPending = user.pending.includes(friend.username);
  // if not found we return null
  if (!isFriendPending) return null;

  // remove the requesting friend the from user's pending list
  user.pending = user.pending.filter(
    (username) => username !== friend.username
  );

  /* 
  in case the user also submmited a friend-request to the friend 
  we remove him as well from the pending list of the friend
  */

  const isUserPending = friend.pending.includes(user.username);
  if (isUserPending)
    friend.pending = friend.pending.filter(
      (username) => username !== user.username
    );

  // add friend.username to user.friends and user.username to friend.friends
  user.friends.push(friend.username);
  friend.friends.push(user.username);

  // save changes to the database
  await user.save();
  await friend.save();
  // return true
  return true;
};

// function to reject a friend request
const rejectFriend = async (id, friendId) => {
  // get the user by their username
  const user = await getUserByuName(id);
  // get the friend requesting user by their username
  const friend = await getUserByuName(friendId);

  // if the user or the friend does not exist, return null
  if (!user || !friend) return null;

  // check if friendId is indeed in the pending list
  if (user.pending.includes(friend.username)) {
    // remove the friend.username from user's pending list
    user.pending = user.pending.filter(
      (username) => username !== friend.username
    );
  } else {
    // remove friend.username from user.friends using filter
    user.friends = user.friends.filter(
      (username) => username !== friend.username
    );
    // remove user.username from friend.friends using filter
    friend.friends = friend.friends.filter(
      (username) => username !== user.username
    );
  }

  // save changes to the database
  await user.save();
  await friend.save();
  // return true
  return true;
};

// function to send a friend request
const pendingFriend = async (id, friendId) => {
  // get the user by their username
  const user = await getUserByuName(id);
  // get the friend-requesting-user by his username
  const friend = await getUserByuName(friendId);
  // if the user or the friend does not exist, return null
  if (!user || !friend) return null;
  // we add the friendId to the pending list of the user
  friend.pending.push(user.username);
  // save changes to the database
  friend.save();
  // return true
  return true;
};

// function to get all post creators who are not friends with the user
const getNonFriendAuthors = async (username) => {
  // get the user by their username
  const user = await getUserByuName(username);
  // if the user does not exist, return null
  if (!user) return null;
  // get all friends of the user
  const friends = await getFriends(user._id);
  // get all users who are not friends with the user
  const nonFriendAuthors = await User.find({
    _id: { $nin: friends.concat(user._id) },
  }).distinct("username");
  // return the list of users who are not friends with the user
  return nonFriendAuthors;
};

// export the functions
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
