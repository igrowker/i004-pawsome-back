import express from 'express';
import { createMaterialDonation } from '../controllers/materialDonation';
const materialDonationRoutes = express.Router();

materialDonationRoutes.post('/', createMaterialDonation);

export default materialDonationRoutes;
