import express from 'express';
import { createSession } from '../controllers/paymentController';
import { authenticateToken } from '../middlewares/authMiddleware';

const paymentRoutes = express.Router()

paymentRoutes.post("/create-checkout-session", authenticateToken,createSession)

export default paymentRoutes