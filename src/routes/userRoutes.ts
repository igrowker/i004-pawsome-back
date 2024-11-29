import express from 'express';
import { getUsers, getUserById, updateUser, addFavorite, removeFavorite, getFavorites } from '../controllers/userController';
import { validateInputs } from '../middlewares/validateInputs';
import { updateUserValidationRules } from '../validations/userValidations';
import { validateMongoId } from '../validations/paramValidator';

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', validateMongoId('id'), validateInputs, getUserById);
userRoutes.put('/:id', validateMongoId('id'), updateUserValidationRules, validateInputs, updateUser);
userRoutes.get('/favorites/:userId', validateMongoId('userId'), validateInputs, getFavorites);
userRoutes.post('/favorites/:userId', validateMongoId('userId'), validateInputs, addFavorite);
userRoutes.delete('/favorites/:userId', validateMongoId('userId'), validateInputs, removeFavorite);

export default userRoutes;
