const users = [{id: 1, username: "name1", password: "123"},
               {id: 2, username: "name2", password: "123"},
               {id: 3, username: "name3", password: "123"},
               {id: 4, username: "name4", password: "123"}]


function getUser(id) {
    for (const i in users) {
        const user = users[i]
        if (user.id == id)
            return user
    }
    return null
}

function newUser(username, password){
    let newUser = {id : users.length + 1, username, password}
    users.push(newUser);
}

function deleteUser(id) {
    users = users.filter(user => !(user.id === id));
}


export default {
    getUser,
    newUser,
    deleteUser
};