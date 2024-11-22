import express from 'express';
import { getUsers, getUserById, updateUser } from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.put('/:id', updateUser);

export default userRoutes;
