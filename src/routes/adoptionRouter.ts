import express from 'express';
import { postAdoption } from '../controllers/adoptionController';
import { authenticateToken } from '../middlewares/authMiddleware';

const adoptionRouter = express.Router();

adoptionRouter.post('/adoption-request/:animal_id', authenticateToken, postAdoption);


export default adoptionRouter;
