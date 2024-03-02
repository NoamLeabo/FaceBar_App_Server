const User = require("../models/user");

const jwt = require("jsonwebtoken");
const key = "Menashe";

const createUser = async (fName, lName, username, password) => {
    const user = new User({fName, lName, username, password});
    return await user.save(); 
}

const getUsers = async () => {
  return await User.find({});
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const getUserByuName = async (uName) => {
  return await User.findByuName(uName);
};
const updateUserPassword = async (id, password) => {
  const user = await getUserById(id);
  if (!user) return null;
  user.password = password;
  await user.save();
  return user;
};

const deleteUser = async (id) => {
  const user = await getUserById(id);
  if (!user) return null;
  await user.deleteOne();
  return user;
};

const getFriends = async (id) => {
    const user = await getUserById(id);
    if (!user)
        return null;
    return user.friends;
}
const acceptFriend = async (id, friendId) => {
    const user = await getUserById(id);
    const friend = await getUserById(friendId);
    if (!user || !friend)
        return null;
    user.friends.push(friend);
    friend.friends.push(user);
}

const rejectFriend = async (id, friendId) => {
    const user = await getUserById(id);
    const friend = await getUserById(friendId);
    if (!user || !friend)
        return null;
    user.friends.pop(friend);
    friend.friends.pop(user);
}




module.exports = {createUser, getUsers, getUserById, updateUserPassword, deleteUser, getFriends, acceptFriend, rejectFriend}