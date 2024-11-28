import express from 'express';
import { getAnimals, getAnimal, updateAnimal, createAnimal, deleteAnimal, getAnimalesByRefugee, getAvailableAnimals} from '../controllers/animalController';
import { validateMongoId } from '../validations/paramValidator';
import { validateInputs } from '../middlewares/validateInputs';
import { createAnimalValidationRules, updateAnimalValidationRules } from '../validations/animalValidations';
import { authenticateTokenRefugee } from '../middlewares/authMiddleware';

const animalRoutes = express.Router();

animalRoutes.get('/', getAnimals);
animalRoutes.get('/available', getAvailableAnimals);
animalRoutes.get('/refugee/:refugeeId', validateMongoId('refugeeId'), validateInputs, getAnimalesByRefugee);
animalRoutes.get('/:id', validateMongoId('id'), validateInputs, getAnimal);
animalRoutes.post('/', authenticateTokenRefugee, createAnimalValidationRules, validateInputs, createAnimal);
animalRoutes.put('/:id', validateMongoId('id'), updateAnimalValidationRules, validateInputs, updateAnimal);
animalRoutes.delete('/:id', validateMongoId('id'), validateInputs, deleteAnimal)

export default animalRoutes;
