import express from 'express';
import {
  createDonationRequest,
  getAllDonationRequests,
  deleteDonationRequest,
  updateDonationRequestStatus,
} from '../controllers/donationsRequestController';

const router = express.Router();

// Crear una nueva solicitud de donación
router.post('/donation-requests', createDonationRequest);

// Obtener todas las solicitudes de donación
router.get('/donation-requests', getAllDonationRequests);

// Actualizar el status de una solicitud de donación
router.patch('/donation-requests/:id/status', updateDonationRequestStatus);

// Eliminar una solicitud de donación
router.delete('/donation-requests/:id', deleteDonationRequest);

export default router;
