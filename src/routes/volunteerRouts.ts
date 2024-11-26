import express from 'express';
import { createVolunteerController, getVolunteerOpportunities, getVolunteerOpportunitiesByRefugeeId, deleteVolunteerOpportunity } from '../controllers/volunteersController';

const volunteerRoutes = express.Router();

volunteerRoutes.get('/', getVolunteerOpportunities);
volunteerRoutes.get('/:id', getVolunteerOpportunitiesByRefugeeId);
volunteerRoutes.post('/:id',createVolunteerController);
volunteerRoutes.delete('/:id', deleteVolunteerOpportunity);



export default volunteerRoutes;
