// require the post service
const postService = require("../services/post");
// require the jsonwebtoken module
const jwt = require("jsonwebtoken");
// require the tokens controller
const tokens = require("./tokens");

// function to create a post
const createPost = async (req, res) => {
  // check if the post content contains a blocked URL
  const response = await postService.checkUrl(req.body.content);
  if (response == false) {
    // if the URL is blocked, return a 403 status code
    console.log("URL is blocked");
    // return a response with an error message
    return res.status(403).json({ errors: ["URL is blocked"] });
  }
  // if the URL is not blocked, create the post and return it as a response
  res.json(
    await postService.createPost(
      req.params.id,
      req.body.content,
      req.body.imageView,
      req.body.published,
      req.body.profilePic
    )
  );
};

// function to get posts of a user
const getUserPosts = async (req, res) => {
  // return the posts of the user as a response
  res.json(await postService.getUserPosts(req.params.id));
};

// function to get all feed posts
const getPosts = async (req, res) => {
  // get the token from the headers
  const key = tokens.key;
  const token = req.headers.authorization.split(" ")[1];
  try {
    // verify the token is valid
    const data = jwt.verify(token, key);
    // if the token is valid, log the username
    console.log("The logged in user is: " + data.username);
    // get the feed posts due to the logged in user
    const username = data.username;
    res.json(await postService.getPosts(username));
  } catch (err) {
    // if the token is invalid, return a 401 status code
    return res.status(401).send("Invalid Token");
  }
};

// function to like a post
const likePost = async (req, res) => {
  // like the post and return it as a response
  res.json(await postService.likePost(req.params.id, req.params.pid));
};

// function to get a post by post-id
const getPostById = async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  if (!post) {
    // if the post is not found, return a 404 status code
    return res.status(404).json({ errors: ["Post not found"] });
  }
  // return the post as a response
  res.json(post);
};

// function to update a post
const updatePost = async (req, res) => {
  // check if the new post content contains a blocked URL
  const response = await postService.checkUrl(req.body.content);
  if (response == false) {
    // if the URL is blocked, return a 403 status code
    return res.status(403).json({ errors: ["URL is blocked"] });
  }
  // update the post
  const post = await postService.updatePost(
    req.params.pid,
    req.body.content,
    req.body.imageView,
    req.body.published
  );
  // if the required post to update is not found, return a 404 status code
  if (!post) {
    // return a 404 status code
    return res.status(404).json({ errors: ["Post not found"] });
  }
  // return the post as a response
  res.json(post);
};

// function to delete a post
const deletePost = async (req, res) => {
  // delete the post and return it as a response
  const post = await postService.deletePost(req.params.pid);
  if (!post) {
    // if the post is not found, return a 404 status code
    return res.status(404).json({ errors: ["Post not found"] });
  }
  res.json(post);
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
};
