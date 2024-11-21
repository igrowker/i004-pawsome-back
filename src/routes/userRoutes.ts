import express from 'express';
import { loginUser, registerUser, getUsers, getUserById } from '../controllers/userController';
import { logoutUser } from '../controllers/logoutController';

const userRoutes = express.Router();

userRoutes.post('/login', loginUser);
userRoutes.post('/register', registerUser);
userRoutes.post('/logout', logoutUser)
userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);

export default userRoutes;
