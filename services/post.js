const Post = require('../models/post');
const userService = require("../services/user")

const createPost = async (author, content) => {
    const post = new Post({author, content});
    return await post.save(); 
}

const getPosts = async (username) => {
    const user = await userService.getUserByuName(username);
    const friends = user.friends;
    
    const friendPosts = await Post.find({ author: { $in: friends } })
                                    .sort({ published: -1 })
                                    .limit(20);
    
    const nonFriendAuthors = await userService.getNonFriendAuthors(username);
    
    let nonFriendPosts = [];
    for (const author of nonFriendAuthors) {
        const posts = await Post.find({ author }).limit(5);
        nonFriendPosts = nonFriendPosts.concat(posts);
    }
    
    const allPosts = friendPosts.concat(nonFriendPosts);
    
    allPosts.sort((a, b) => b.published - a.published);
    
    const finalPosts = allPosts.slice(0, 20);
    
    return finalPosts;
}

const getPostById = async (id) => {
    return await Post.findById(id);
}

const updatePost = async (id, content, imageView) => {
    const post = await getPostById(id)
    if (!post)
        return null;
    post.content = content;
    post.imageView = imageView;
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