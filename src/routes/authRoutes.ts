import express from 'express';
import { loginUser, logoutUser, forgotPassword, resetPassword } from '../controllers/authController';
import { forgotPassValidationRules, loginValidationRules, resetPassValidationRules } from '../validations/authValidations';
import { validateInputs } from '../middlewares/validateInputs';
import { roleBasedController } from '../middlewares/rolesBasedController';
import { dynamicValidationMiddleware } from '../middlewares/dynamicValidation';

const authRoutes = express.Router();

authRoutes.post('/login', loginValidationRules, validateInputs, loginUser);
authRoutes.post('/register', dynamicValidationMiddleware, validateInputs, roleBasedController);
authRoutes.post('/logout', logoutUser)
authRoutes.post('/forgot-password', forgotPassValidationRules, validateInputs, forgotPassword);
authRoutes.put('/reset-password', resetPassValidationRules, validateInputs, resetPassword);

export default authRoutes;
