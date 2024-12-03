import express from 'express';
import { createVolunteerController, getVolunteerOpportunities, getVolunteerOpportunitiesByRefugeeId, deleteVolunteerOpportunity, updateVolunteerOpportunity } from '../controllers/volunteersController';
import { checkRole } from '../middlewares/roleMiddleware';
import { authenticateToken } from '../middlewares/authMiddleware';

const volunteerRoutes = express.Router();

volunteerRoutes.get('/', authenticateToken,getVolunteerOpportunities);
volunteerRoutes.get('/:id', getVolunteerOpportunitiesByRefugeeId);
volunteerRoutes.post('/:id', checkRole('refugee'), createVolunteerController);
volunteerRoutes.delete('/:id', checkRole('refugee'), deleteVolunteerOpportunity);
volunteerRoutes.put('/:opportunityId', updateVolunteerOpportunity);


export default volunteerRoutes;
