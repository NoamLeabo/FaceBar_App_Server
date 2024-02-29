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


module.exports = {createUser, getUsers, getUserById, updateUserPassword, deleteUser, getFriends}