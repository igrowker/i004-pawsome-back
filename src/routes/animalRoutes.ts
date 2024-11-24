import express from 'express';
import { getAnimals, getAnimal, updateAnimal, createAnimal, deleteAnimal, getAnimalesByRefugee} from '../controllers/animalController';
import { validateMongoId } from '../validations/paramValidator';
import { validateInputs } from '../middlewares/validateInputs';
import { createAnimalValidationRules, updateAnimalValidationRules } from '../validations/animalValidations';

const animalRoutes = express.Router();

animalRoutes.get('/', getAnimals);
animalRoutes.get('/:refugeeId', getAnimalesByRefugee);
animalRoutes.get('/:id', validateMongoId('id'), validateInputs, getAnimal);
animalRoutes.post('/', createAnimalValidationRules, validateInputs, createAnimal);
animalRoutes.put('/:id', validateMongoId('id'), updateAnimalValidationRules, validateInputs, updateAnimal);
animalRoutes.delete('/:id', validateMongoId('id'), validateInputs, deleteAnimal)

export default animalRoutes;
