import express from 'express';
import { getDashboard, deleteUserController, deleteRefugeeController } from '../controllers/adminController';
import { checkRole } from '../middlewares/roleMiddleware';

const adminRoutes = express.Router();

adminRoutes.get('/dashboard/:refugeId', getDashboard);

adminRoutes.delete('/users/:userId', checkRole('admin'), deleteUserController);

adminRoutes.delete('/refugees/:refugeeId', checkRole('admin'), deleteRefugeeController);

export default adminRoutes;
