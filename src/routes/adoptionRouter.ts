import express from 'express';
import { postAdoption, putAdoptionStatus } from '../controllers/adoptionController';
import { checkRole } from '../middlewares/roleMiddleware';

const adoptionRouter = express.Router();

adoptionRouter.post('/adoption-request/:animal_id', checkRole('user'), postAdoption);
adoptionRouter.put('/adoption-request/:id', putAdoptionStatus);

export default adoptionRouter;