import express from 'express';
import { getAnimals, getAnimal, updateAnimal} from '../controllers/animalController';

const animalRoutes = express.Router();

animalRoutes.get('/', getAnimals);
animalRoutes.get('/:id', getAnimal);
animalRoutes.put('/:id', updateAnimal);

export default animalRoutes;
