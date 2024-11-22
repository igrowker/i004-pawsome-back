import express from 'express';
import { createAdminController, getDashboard } from '../controllers/adminController'; // Asegúrate de importar el controlador correcto

const adminRoutes = express.Router();

adminRoutes.get('/dashboard/:refugeId', getDashboard);
adminRoutes.patch('/promote-to-admin/:userID', createAdminController);

export default adminRoutes;
