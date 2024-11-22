import express from 'express';
import { createVolunteerController, getVolunteerOpportunities, getVolunteerOpportunitiesByRefugeeId } from '../controllers/volunteersController';

const volunteerRoutes = express.Router();

volunteerRoutes.get('/', getVolunteerOpportunities);
volunteerRoutes.get('/:id', getVolunteerOpportunitiesByRefugeeId);
volunteerRoutes.post('/:id',createVolunteerController);


export default volunteerRoutes;
