import express from 'express';
import { getUsers, getUserById } from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);

export default userRoutes;
