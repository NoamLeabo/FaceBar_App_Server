import postModel from "../models/posts.js";

function getAllPosts(req, res){
    const posts = postModel.getPosts();
    res.render('../views/allPosts', {posts})    
}


function getPost(req, res){
    const post = postModel.getPost(req.params.id);
    res.render('../views/post', {post})   
}

function createPost(req, res){
    const posts = postModel.createPost(req.body.author, req.body.content);
    res.end('post added!')
}

export {
    getAllPosts,
    getPost
}