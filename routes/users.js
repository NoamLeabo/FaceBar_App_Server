import express from 'express';
import { getUser, deleteUser, newUser, updateUser } from '../controllers/users.js';

const router = express.Router();

router.post('/', newUser);

router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

//router.get('/:id/posts', getUserPosts);
//router.post('/:id/posts', newUserPost);

//router.patch('/:id/posts/:pid', editUserPost);
//router.delete('/:id/posts/:pid', deleteUserPost);

//router.get('/:id/friends', getUserFriends);
//router.post('/:id/friends', newUserFriendRequest);

//router.pacth('/:id/friends/:fid', acceptUserFriendRequest);
//router.delete('/:id/friends/:fid', deleteUserFriend);

export default router;
