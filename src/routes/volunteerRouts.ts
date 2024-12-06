import express from 'express';
import { createVolunteerController, getVolunteerOpportunities, getVolunteerOpportunitiesByRefugeeId, deleteVolunteerOpportunity, updateVolunteerOpportunity, registerVolunteerController } from '../controllers/volunteersController';
import { checkRole } from '../middlewares/roleMiddleware';

const volunteerRoutes = express.Router();

volunteerRoutes.get('/',getVolunteerOpportunities);
volunteerRoutes.get('/:refugeeId', getVolunteerOpportunitiesByRefugeeId);
volunteerRoutes.post('/:id', checkRole('refugee'), createVolunteerController);
volunteerRoutes.delete('/:id', checkRole('refugee'), deleteVolunteerOpportunity);
volunteerRoutes.put('/:opportunityId', updateVolunteerOpportunity);
volunteerRoutes.post('/:refugioId/oportunidades', registerVolunteerController);



export default volunteerRoutes;
