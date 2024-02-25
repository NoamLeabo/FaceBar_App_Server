const Post = require('../models/post');

const createPost = async (author, content) => {
    const post = new Post({author, content});
    return await post.save(); 
}

const getPosts = async () => {
    return await Post.find({});
}

const getPostById = async (id) => {
    return await Post.findById(id);
}

const updatePost = async (id, content) => {
    const post = await getPostById(id)
    if (!post)
        return null;
    post.content = content;
    await post.save();
    return post;
}

const deletePost = async (id) => {
    const post = await getPostById(id)
    if (!post)
        return null;
    await post.deleteOne();
    return post;
}


module.exports = {createPost, getPosts, getPostById, updatePost, deletePost}