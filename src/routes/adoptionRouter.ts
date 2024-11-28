import express from 'express';
import { postAdoption } from '../controllers/adoptionController';
import { checkRole } from '../middlewares/roleMiddleware';

const adoptionRouter = express.Router();

adoptionRouter.post('/adoption-request', checkRole('refugee'), postAdoption);

export default adoptionRouter;
