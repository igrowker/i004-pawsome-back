import express from 'express';
import { postAdoption, putAdoptionStatus } from '../controllers/adoptionController';

const adoptionRouter = express.Router();

adoptionRouter.post('/adoption-request', postAdoption);
adoptionRouter.put('/adoption-request/:id', putAdoptionStatus);

export default adoptionRouter;
