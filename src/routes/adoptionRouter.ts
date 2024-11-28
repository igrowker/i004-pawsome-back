import express from 'express';
import { postAdoption, putAdoptionStatus } from '../controllers/adoptionController';
import { checkRole } from '../middlewares/roleMiddleware';

const adoptionRouter = express.Router();

adoptionRouter.post('/adoption-request', checkRole('refugee'), postAdoption);
adoptionRouter.put('/adoption-request/:id', putAdoptionStatus);

export default adoptionRouter;