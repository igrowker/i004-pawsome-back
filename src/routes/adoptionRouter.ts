import express from 'express';
import { postAdoption, putAdoptionStatus } from '../controllers/adoptionController';
import { authenticateToken } from '../middlewares/authMiddleware';

const adoptionRouter = express.Router();

adoptionRouter.post('/adoption-request/:animal_id',authenticateToken, postAdoption);
adoptionRouter.put('/adoption-request/:id', putAdoptionStatus);

export default adoptionRouter;