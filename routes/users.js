import express from 'express';
import { getUser, deleteUser, newUser } from '../controllers/users.js';

const router = express.Router();

router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.post('/', newUser);


export default router;
