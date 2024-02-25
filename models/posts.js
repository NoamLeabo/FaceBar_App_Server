const posts = [{id: 1, author: "post-1", content: "interesting-content-1"},
               {id: 2, author: "post-2", content: "interesting-content-2"},
               {id: 3, author: "post-3", content: "interesting-content-3"},
               {id: 4, author: "post-4", content: "interesting-content-4"}]

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