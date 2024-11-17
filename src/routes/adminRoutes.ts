import express from 'express';
import { getDashboard } from '../controllers/adminController'; // Asegúrate de importar el controlador correcto

const adminRoutes = express.Router();

adminRoutes.get('/dashboard', getDashboard);

export default adminRoutes;
