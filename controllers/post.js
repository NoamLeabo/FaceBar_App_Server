const postService = require("../services/post")
const jwt = require("jsonwebtoken");

const createPost = async (req, res) => {
    res.json(await postService.createPost(req.body.author, req.body.content));
}

const getPosts = async (req, res) => {
    const key = "Menashe";
    const token = req.headers.authorization.split(" ")[1];
    try {
      // Verify the token is valid
      const data = jwt.verify(token, key);
      console.log("The logged in user is: " + data.username);
      const username = data.username
      res.json(await postService.getPosts(username));
    } catch (err) {
        return res.status(401).send("Invalid Token");
      }
}

const getPostById = async (req, res) => {
    const post = await postService.getPostById(req.params.id);
    if (!post){
        return res.status(404).json({errors : ["Post not found"]});
    }
    res.json(post);
}

const updatePost = async (req, res) => {
    const post = await postService.updatePost(req.params.id, req.body.content, req.body.imageView);
    if (!post){
        return res.status(404).json({errors : ["Post not found"]});
    }
    res.json(post);
}

const deletePost = async (req, res) => {
    const post = await postService.deletePost(req.params.id);
    if (!post){
        return res.status(404).json({errors : ["Post not found"]});
    }
    res.json(post);
}

module.exports = {createPost, getPosts, getPostById, updatePost, deletePost}