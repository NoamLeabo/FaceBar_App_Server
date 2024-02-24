import express from 'express';
import { getAllPosts, getPost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/post/:id', getPost);


export default router;
