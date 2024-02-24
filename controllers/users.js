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


export {
    getUser,
    deleteUser,
    newUser
}
