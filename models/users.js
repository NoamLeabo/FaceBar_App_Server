const users = [{id: 1, username: "noam", password: "123"},
               {id: 2, username: "david", password: "123"},
               {id: 3, username: "menashe", password: "123"},
               {id: 4, username: "moshe", password: "123"}]


function newUser(username, password){
    let newUser = {id : users.length + 1, username, password}
    users.push(newUser);
}

function getUser(id) {
    for (const i in users) {
        const user = users[i]
        if (user.id == id)
            return user
    }
    return null
}

function updateUser(id, username, password) {
    for (const i in users) {
        const user = users[i]
        if (user.id == id) {
            user.username = username;
            user.password = password;
            return true;
        }
    }
    return false;
}

function deleteUser(id) {
    users = users.filter(user => !(user.id === id));
}


export default {
    getUser,
    newUser,
    deleteUser,
    updateUser
};