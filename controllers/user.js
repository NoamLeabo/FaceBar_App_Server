const { get } = require("mongoose");
const userService = require("../services/user")

const createUser = async (req, res) => {
    const user= await userService.createUser(
      req.body.fName,
      req.body.lName,
      req.body.username,
      req.body.password,
      req.body.profileImg
    );
    if(!user){
      return res.status(400).json({errors: ["Username already taken"]});
    }
    res.json({message: "User created"});
};

const getUsers = async (req, res) => {
  res.json(await userService.getUsers());
};

const getUserById = async (req, res) => {
  const user = await userService.getUserByuName(req.params.id);
  if (!user) {
    return res.status(404).json({ errors: ["User not found"] });
  }
  res.json(user);
};

const updateUser = async (req, res) => {
  const user = await userService.updateUser(
    req.params.id,
    req.body.password,
    req.body.profileImg
  );
  if (!user) {
    return res.status(404).json({ errors: ["User not found"] });
  }
  res.json(user);
};

const deleteUser = async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  if (!user) {
    return res.status(404).json({ errors: ["User not found"] });
  }
  res.json(user);
};

const getFriends = async (req, res) => {
    const user = await userService.getUserByuName(req.params.id);
    if(!user){
        return res.status(404).json({errors : ["User not found"]});
    }
    res.json(await userService.getFriends(req.params.id));
}

const pendingFriend = async (req, res) => {
    const id = req.params.id;
    const fid = req.body.fid;
    const acc = await userService.pendingFriend(id,fid);
    if(!acc){
        return res.status(404).json({errors : ["User not found"]});
    }
    res.json({message: "Friend request sent"});
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

module.exports = {createUser, getUsers, getUserById, updateUser, deleteUser, getFriends, pendingFriend, acceptFriend, rejectFriend}