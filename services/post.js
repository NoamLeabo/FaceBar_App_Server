const Post = require("../models/post");
const userService = require("../services/user");

const createPost = async (author, content, imageView, published,profilePic) => {
    const post = new Post({author, profilePic, published, content, imageView});
    return await post.save(); 
}

// Helper function to parse time from "HH:MM, DD/MM" format to a number (minutes from midnight)
function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(', ')[0].split(':');
    return Number(hours) * 60 + Number(minutes);
}
const getPosts = async (username) => {
    try {
        const user = await userService.getUserByuName(username);
        const friends = user.friends;

        const friendPosts = await Post.find({ author: { $in: friends } })
            .sort({ _id: -1 })  // Sort in descending order by _id
            .limit(20);

        const nonFriendPosts = await Post.find({ author: { $nin: friends } })
            .sort({ _id: -1 })  // Sort in descending order by _id
            .limit(5); 

        let allPosts = friendPosts.concat(nonFriendPosts);

         // Sort allPosts by published in descending order (most recent first)
         allPosts = allPosts.sort((a, b) => {
            const timeA = parseTime(a.published);
            const timeB = parseTime(b.published);
            return timeB - timeA;
        });
        allPosts= allPosts.reverse();
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

const likePost = async (id, pid) => {
    const post = await getPostById(pid);
    const user = await userService.getUserByuName(id);
    if (!post || !user) return null;
    if (post.usersWhoLiked.includes(id)) {
        post.usersWhoLiked = post.usersWhoLiked.filter(userId => userId !== id);
      } else {
        post.usersWhoLiked.push(id);  
      }
    post.save();
    return post;
  };

const getUserPosts = async (username) => {
    try {
        const user = await userService.getUserByuName(username);
        if (!user) return null;

        const userPosts = await Post.find({ author: username })
            .sort({ published: -1 });

            let finishPosts = userPosts;

            finishPosts = finishPosts.sort((a, b) => {
                const timeA = parseTime(a.published);
                const timeB = parseTime(b.published);
                return timeB - timeA;
            });
            finishPosts= finishPosts.reverse();
            return finishPosts;
        } catch (error) {
        // Handle errors, for example:
        console.error("Error fetching posts:", error);
        return []; // Return an empty array or handle the error appropriately.
    }
}
module.exports = { createPost, getPosts, getPostById, updatePost, deletePost , getUserPosts, likePost};
