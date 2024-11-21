import express from 'express';
import { loginUser, registerUser, logoutUser, forgotPassword, resetPassword } from '../controllers/authController';

const authRoutes = express.Router();

authRoutes.post('/login', loginUser);
authRoutes.post('/register', registerUser);
authRoutes.post('/logout', logoutUser)
authRoutes.post('/forgot-password', forgotPassword);
authRoutes.put('/reset-password', resetPassword);

export default authRoutes;
