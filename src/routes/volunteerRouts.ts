import express from 'express';
import { createVolunteerController, getVolunteerOpportunities, getVolunteerOpportunitiesByRefugeeId, deleteVolunteerOpportunity } from '../controllers/volunteersController';
import { authenticateToken } from '../middlewares/authMiddleware';

const volunteerRoutes = express.Router();

volunteerRoutes.get('/', authenticateToken,getVolunteerOpportunities);
volunteerRoutes.get('/:id', getVolunteerOpportunitiesByRefugeeId);
volunteerRoutes.post('/:id',createVolunteerController);
volunteerRoutes.delete('/:id', deleteVolunteerOpportunity);



export default volunteerRoutes;
