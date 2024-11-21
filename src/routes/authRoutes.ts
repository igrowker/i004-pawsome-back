import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController';

const authRoutes = express.Router();

authRoutes.post('/login', loginUser);
authRoutes.post('/register', registerUser);
authRoutes.post('/logout', logoutUser)

export default authRoutes;
