import express from 'express';
import { getUsers, getUserById } from '../controllers/userController';
import { checkRole } from '../middlewares/roleMiddleware';

const userRoutes = express.Router();

userRoutes.get('/', checkRole('admin'), getUsers);
userRoutes.get('/:id', getUserById);

export default userRoutes;
