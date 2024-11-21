import express from 'express';
import { getAnimals, getAnimal, updateAnimal, createAnimal, deleteAnimal} from '../controllers/animalController';

const animalRoutes = express.Router();

animalRoutes.get('/', getAnimals);
animalRoutes.get('/:id', getAnimal);
animalRoutes.post('/', createAnimal);
animalRoutes.put('/:id', updateAnimal);
animalRoutes.delete('/:id', deleteAnimal)

export default animalRoutes;
