import express from 'express';
import { getDashboard } from '../controllers/adminController'; // Asegúrate de importar el controlador correcto

const router = express.Router();

router.get('/dashboard', getDashboard);

export default router;
