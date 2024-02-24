const posts = [{id: 1, author: "name1", content: "interesting1"},
               {id: 2, author: "name2", content: "interesting2"},
               {id: 3, author: "name3", content: "interesting3"},
               {id: 4, author: "name4", content: "interesting4"}]

function getPosts(){
    return posts;
}

function getPost(id) {
    for (const i in posts) {
        const post = posts[i]
        if (post.id == id)
            return post
    }
    return null
}

function createPost(author, content){
    let newPost = {id : posts.length, author, content}
    posts.push(newPost);

}

export default {
    createPost,
    getPost, 
    getPosts 
};