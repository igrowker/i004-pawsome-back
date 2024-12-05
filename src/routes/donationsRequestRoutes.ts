import express from "express";
import {
  createDonationRequest,
  getAllDonationRequests,
  deleteDonationRequest,
  updateDonationRequestStatus,
} from "../controllers/donationsRequestController";
import { authenticateToken } from "../middlewares/authMiddleware";

const donationRoutes = express.Router();

// Crear una nueva solicitud de donación
donationRoutes.post(
  "/donation-requests",
  authenticateToken,
  createDonationRequest
);

// Obtener todas las solicitudes de donación
donationRoutes.get("/donation-requests", getAllDonationRequests);

// Actualizar el status de una solicitud de donación
donationRoutes.patch(
  "/donation-requests/:id/status",
  updateDonationRequestStatus
);

// Eliminar una solicitud de donación
donationRoutes.delete("/donation-requests/:id", deleteDonationRequest);

export default donationRoutes;
