import express from 'express';
import { getAnimals, getAnimal, updateAnimal, createAnimal, deleteAnimal, getAnimalesByRefugee, getAvailableAnimals} from '../controllers/animalController';
import { validateMongoId } from '../validations/paramValidator';
import { validateInputs } from '../middlewares/validateInputs';
import { createAnimalValidationRules, updateAnimalValidationRules } from '../validations/animalValidations';
import { checkRole } from '../middlewares/roleMiddleware';
//import { authenticateTokenRefugee } from '../middlewares/authMiddleware';

const animalRoutes = express.Router();

animalRoutes.get('/', getAnimals);
animalRoutes.get('/available', getAvailableAnimals);
animalRoutes.get('/refugee/:refugeeId', validateMongoId('refugeeId'), validateInputs, getAnimalesByRefugee);
animalRoutes.get('/:id', validateMongoId('id'), validateInputs, getAnimal);
animalRoutes.post('/', checkRole('refugee'), createAnimalValidationRules, validateInputs, createAnimal);
animalRoutes.put('/:id', validateMongoId('id'), checkRole('refugee'), updateAnimalValidationRules, validateInputs, updateAnimal);
animalRoutes.delete('/:id', validateMongoId('id'), checkRole('refugee'), validateInputs, deleteAnimal)

export default animalRoutes;
