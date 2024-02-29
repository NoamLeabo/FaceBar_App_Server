const User = require('../models/user');

const createUser = async (fName, lName, username, password) => {
    const user = new User({fName, lName, username, password});
    return await user.save(); 
}

const getUsers = async () => {
    return await User.find({});
}

const getUserById = async (id) => {
    return await User.findById(id);
}

const updateUserPassword = async (id, password) => {
    const user = await getUserById(id)
    if (!user)
        return null;
    user.password = password;
    await user.save();
    return user;
}

const deleteUser = async (id) => {
    const user = await getUserById(id)
    if (!user)
        return null;
    await user.deleteOne();
    return user;
}

const getFriends = async (id) => {
    const user = await getUserById(id);
    return user.friends;
}
const acceptFriend = async (id, friendId) => {
    const user = await getUserById(id);
    const friend = await getUserById(friendId);
    if (!user || !friend)
        return null;
    user.pending.pop(friend.id);
    friend.pending.pop(user.id);    
    user.friends.push(friend.id);
    friend.friends.push(user.id);
    user.save();
    friend.save();
    return true;
}

const rejectFriend = async (id, friendId) => {
    const user = await getUserById(id);
    const friend = await getUserById(friendId);
    if (!user || !friend)
        return null;
    user.pending.pop(friend.id);
    friend.pending.pop(user.id);  
    user.friends.pop(friend.id);
    friend.friends.pop(user.id);
    user.save();
    friend.save();
    return true;
}

const pendingFriend = async (id, friendId) => {
    const user = await getUserById(id);
    const friend = await getUserById(friendId);
    if (!user || !friend)
        return null;
    user.pending.push(friend.id);
    friend.pending.push(user.id);
    user.save();
    friend.save();
    return true;

}




module.exports = {createUser, getUsers, getUserById, updateUserPassword, deleteUser, getFriends, acceptFriend, rejectFriend}