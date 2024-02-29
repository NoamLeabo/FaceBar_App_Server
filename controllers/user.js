const userService = require("../services/user")

const createUser = async (req, res) => {
    res.json(await userService.createUser(req.body.fName,
                                          req.body.lName,
                                          req.body.username,
                                          req.body.password));
}

const getUsers = async (req, res) => {
    res.json(await userService.getUsers());
}

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (!user){
        return res.status(404).json({errors : ["User not found"]});
    }
    res.json(user);
}

const updateUserPassword = async (req, res) => {
    const user = await userService.updateUserPassword(req.params.id, req.body.password);
    if (!user){
        return res.status(404).json({errors : ["User not found"]});
    }
    res.json(user);
}

const deleteUser = async (req, res) => {
    const user = await userService.deleteUser(req.params.id);
    if (!user){
        return res.status(404).json({errors : ["User not found"]});
    }
    res.json(user);
}

const getFriends = async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if(!user){
        return res.status(404).json({errors : ["User not found"]});
    }
    res.json(user.getFriends);
}

const addFriend = async (req, res) => {
}

const acceptFriend = async (req, res) => {
    const acc = await userService.acceptFriend(req.params.id, req.params.fid);
    if(!acc){
        return res.status(404).json({errors : ["User not found"]});
    }
    res.json({message: "Friend request accepted"});
}

const rejectFriend = async (req, res) => {
   const acc = await userService.rejectFriend(req.params.id, req.params.fid);  
   if(!acc){
    return res.status(404).json({errors : ["User not found"]});
   }
    res.json({message: "Friend deleted"});                   
}

module.exports = {createUser, getUsers, getUserById, updateUserPassword, deleteUser, getFriends, addFriend, acceptFriend, rejectFriend}