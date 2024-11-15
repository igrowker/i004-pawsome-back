import express from 'express';
import { postAdoption } from '../controllers/adoptionController';

const adoptionRouter = express.Router();

adoptionRouter.post('/adoption-request', postAdoption);


export default adoptionRouter;
