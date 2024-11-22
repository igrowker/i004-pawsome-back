import express from 'express';
import { getUsers, getUserById, updateUser } from '../controllers/userController';
import { validateInputs } from '../middlewares/validateInputs';
import { updateUserValidationRules } from '../validations/userValidations';
import { validateMongoId } from '../validations/paramValidator';

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', validateMongoId('id'), validateInputs, getUserById);
userRoutes.put('/:id', validateMongoId('id'), updateUserValidationRules, validateInputs, updateUser);

export default userRoutes;
