// require post model
const Post = require("../models/post");
// require user service
const userService = require("../services/user");

// require net module
const net = require("net");

// function to check if a post content contains a blocked URL
async function checkUrl(content) {
  // set the regex for a URL
  const urlRegex =
    /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]*/g;
  // extract URLs from the content if such exist
  const urls = content.match(urlRegex);
  // if there are no URLs, return true
  if (!urls) return true;

  // create a new socket
  const client = new net.Socket();
  // initialize a var indicating nums of urls checked
  let urlIndex = 0;

  try {
    // return a promise
    await new Promise((resolve, reject) => {
      // connect to the TCP server
      client.connect(process.env.TCP_PORT, process.env.TCP_ADDRESS, () =>
        client.write(2 + " " + urls[urlIndex])
      );
      // handle the returned data from the server indicating if the URL is blocked
      client.on("data", (data) => {
        // if the server responded with 'T' (true), reject the promise
        if (data.toString().charAt(0) == "T")
          reject("Server responded with T (it does contain a blocked URL)");
        // if the server responded with 'F' (false), continue to the next URL until all URLs are checked
        if (++urlIndex < urls.length) client.write(2 + " " + urls[urlIndex]);
        else {
          // if all URLs are checked, resolve the promise with an empty string
          client.write("");
          resolve();
        }
      });
    });
  } catch (error) {
    // log the error and return error
    console.log(error);
    return false;
  } finally {
    // close the connection to the TCP server
    client.destroy();
  }
  return true;
}

// function to create a post in the database
const createPost = async (
  author,
  content,
  imageView,
  published,
  profilePic
) => {
  // create a new post object
  const post = new Post({ author, profilePic, published, content, imageView });
  // save the post in the database
  return await post.save();
};

// function to parse time from "HH:MM, DD/MM" format to a number (minutes from midnight)
function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(", ")[0].split(":");
  return Number(hours) * 60 + Number(minutes);
}

// function to get all feed posts due to a user
const getPosts = async (username) => {
  try {
    // get the user by the given username
    const user = await userService.getUserByuName(username);
    // save the friends of the user
    const friends = user.friends;

    // get posts of the user's friends (20 at most)
    const friendPosts = await Post.find({ author: { $in: friends } })
      .sort({ _id: -1 }) // sort in descending order by _id
      .limit(20);

    // get posts of users who are not friends of the user (5 at most)
    const nonFriendPosts = await Post.find({ author: { $nin: friends } })
      .sort({ _id: -1 }) // sort in descending order by _id
      .limit(5);

    // combine both lists posts of friends and non-friends
    let allPosts = friendPosts.concat(nonFriendPosts);

    // sort allPosts by published in descending order (most recent first)
    allPosts = allPosts.sort((a, b) => {
      const timeA = parseTime(a.published);
      const timeB = parseTime(b.published);
      return timeB - timeA;
    });

    // reverse the order of allPosts
    allPosts = allPosts.reverse();
    // return all posts
    return allPosts;
  } catch (error) {
    // handle errors
    console.error("Error fetching posts:", error);
    // return an empty array in case of an error
    return [];
  }
};

// function to get a post by its id
const getPostById = async (id) => {
  return await Post.findById(id);
};

// function to update a post in the database
const updatePost = async (id, content, imageView, published) => {
  // get the post by its id
  const post = await getPostById(id);
  // if the post does not exist, return null
  if (!post) return null;
  // update the post's content, image, and published date
  post.content = content;
  post.imageView = imageView;
  post.published = published;
  // save the updated post in the database
  await post.save();
  // return the updated post
  return post;
};

// function to delete a post from the database
const deletePost = async (id) => {
  // get the post by its id
  const post = await getPostById(id);
  // if the post does not exist, return null
  if (!post) return null;
  // delete the post from the database
  await post.deleteOne();
  // return the deleted post
  return post;
};

// function to like a post
const likePost = async (id, pid) => {
  // get the post by its id
  const post = await getPostById(pid);
  // get the user by their username
  const user = await userService.getUserByuName(id);
  // if the post or the user does not exist, return null
  if (!post || !user) return null;
  // if the user has already liked the post, unlike it
  if (post.usersWhoLiked.includes(id)) {
    // remove the user from the list of users who liked the post
    post.usersWhoLiked = post.usersWhoLiked.filter((userId) => userId !== id);
  } else {
    // if the user has not liked the post yet, like it
    post.usersWhoLiked.push(id);
  }
  // save the updated post in the database
  post.save();
  // return the updated post
  return post;
};

// function to get all posts of a user by their username
const getUserPosts = async (username) => {
  try {
    // get the user by their username
    const user = await userService.getUserByuName(username);
    // if the user does not exist, return null
    if (!user) return null;
    // get all posts of the user
    const userPosts = await Post.find({ author: username }).sort({
      published: -1,
    });

    // sort the posts by published date in descending order
    let finishPosts = userPosts;
    finishPosts = finishPosts.sort((a, b) => {
      const timeA = parseTime(a.published);
      const timeB = parseTime(b.published);
      return timeB - timeA;
    });

    // reverse the order of finishPosts
    finishPosts = finishPosts.reverse();
    // return all posts of the user
    return finishPosts;
  } catch (error) {
    // handle errors
    console.error("Error fetching posts:", error);
    // return an empty array in case of an error
    return [];
  }
};

// export the functions
module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getUserPosts,
  likePost,
  checkUrl,
};
