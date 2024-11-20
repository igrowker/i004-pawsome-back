import express from 'express';
import { createVolunteerOpportunity, getVolunteerOpportunities, getVolunteerOpportunitiesByRefugeeId } from '../controllers/volunteersController';

const volunteerRoutes = express.Router();

volunteerRoutes.get('/', getVolunteerOpportunities);
volunteerRoutes.get('/:id', getVolunteerOpportunitiesByRefugeeId);
volunteerRoutes.post('/:id',createVolunteerOpportunity);


export default volunteerRoutes;
