import userModel from "../models/users.js";

function getUser(req, res){
    const user = userModel.getUser(req.params.id);
    res.end(user.username + '  '+ user.password);
}

function deleteUser(req, res){
    const user = userModel.deleteUser(req.params.id);
    res.end('the user was deleted!')
}

function newUser(req, res){
    const user = userModel.newUser(req.body.username, req.body.password);
    res.end('the user: ' + req.body.username + ' was added!')
}

function updateUser(req, res){
    const status = userModel.updateUser(req.params.id, req.body.username, req.body.password);
    if (status)
        res.end('the info of user: ' + req.body.username + ' was updated!')
    else
        res.end('no such user: ' + req.body.username + ' was found!')
}

export {
    getUser,
    deleteUser,
    newUser,
    updateUser
}
