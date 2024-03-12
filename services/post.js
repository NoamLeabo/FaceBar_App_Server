const Post = require("../models/post");
const userService = require("../services/user");

const createPost = async (author, content, imageView, published,profilePic) => {
    const post = new Post({author, profilePic, published, content, imageView});
    return await post.save(); 
}

const getPosts = async (username) => {
    try {
        const user = await userService.getUserByuName(username);
        const friends = user.friends;

        const friendPosts = await Post.find({ author: { $in: friends } })
            .sort({ _id: +1 })
            .limit(20);

       const nonFriendPosts = await Post.find({ author: { $nin: friends } })
    .sort({ _id: -1 })  // Sort in descending order by _id
    .limit(5); 

    nonFriendPosts.sort((a, b) => b._id - a._id);

        const allPosts = friendPosts.concat(nonFriendPosts);

        // Sort allPosts by _id
        allPosts.sort((a, b) => a._id - b._id);
        return allPosts;
    } catch (error) {
        // Handle errors, for example:
        console.error("Error fetching posts:", error);
        return []; // Return an empty array or handle the error appropriately.
    }
}


const getPostById = async (id) => {
  return await Post.findById(id);
};

const updatePost = async (id, content, imageView, published) => {
    const post = await getPostById(id)
    if (!post)
        return null;
    post.content = content;
    post.imageView = imageView;
    post.published = published;
    await post.save();
    return post;
}

const deletePost = async (id) => {
  const post = await getPostById(id);
  if (!post) return null;
  await post.deleteOne();
  return post;
};

const getUserPosts = async (username) => {
    try {
        const user = await userService.getUserByuName(username);
        const userPosts = await Post.find({ author: username })
            .sort({ published: -1 });

        userPosts.sort((a, b) => b.published - a.published);

        return userPosts;
    } catch (error) {
        // Handle errors, for example:
        console.error("Error fetching posts:", error);
        return []; // Return an empty array or handle the error appropriately.
    }
}
module.exports = { createPost, getPosts, getPostById, updatePost, deletePost , getUserPosts};
