import express from 'express';
import { createAdminController, getDashboard, deleteUserController, deleteRefugeeController, createAdmin } from '../controllers/adminController';
import { checkRole } from '../middlewares/roleMiddleware';
import { authenticateAdminToken } from '../middlewares/authMiddleware';

const adminRoutes = express.Router();

adminRoutes.get('/dashboard', getDashboard);
adminRoutes.post('/createAdmin', createAdmin)
adminRoutes.patch('/promote-to-admin/:userID', createAdminController);
adminRoutes.delete('/users/:userId', authenticateAdminToken, deleteUserController);

export default adminRoutes;