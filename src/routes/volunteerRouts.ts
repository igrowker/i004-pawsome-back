import express from 'express';
import { createVolunteerOpportunity, getVolunteerOpportunities, getVolunteerOpportunitiesByRefugeeId } from '../controllers/volunteersController';

const router = express.Router();

router.route('/')
  .get(getVolunteerOpportunities)
  .post(createVolunteerOpportunity);

router.get('/:id', getVolunteerOpportunitiesByRefugeeId);

export default router;
