import express from 'express';
import { loginUser } from '../controllers/userController';

const router = express.Router();

router.post('/login', loginUser); // Ruta de login

export default router;
