import express from 'express';
import { loginUser, registerUser, logoutUser, forgotPassword, resetPassword } from '../controllers/authController';
import { forgotPassValidationRules, loginValidationRules, registerValidationRules, resetPassValidationRules } from '../validations/authValidations';
import { validateInputs } from '../middlewares/validateInputs';

const authRoutes = express.Router();

authRoutes.post('/login', loginValidationRules, validateInputs, loginUser);
authRoutes.post('/register', registerValidationRules, validateInputs, registerUser);
authRoutes.post('/logout', logoutUser)
authRoutes.post('/forgot-password', forgotPassValidationRules, validateInputs, forgotPassword);
authRoutes.put('/reset-password', resetPassValidationRules, validateInputs, resetPassword);

export default authRoutes;
