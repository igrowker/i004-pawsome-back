import express from "express";
import { createMaterialDonation, updateMaterialDonationQuantity, getMaterialDonationsByUser } from "../controllers/materialDonation";
const materialDonationRoutes = express.Router();

materialDonationRoutes.get("/material-donations-by-user/:user_id", getMaterialDonationsByUser);
materialDonationRoutes.post("/new-material-donation", createMaterialDonation);
materialDonationRoutes.put("/update-material-donation/:id", updateMaterialDonationQuantity);

export default materialDonationRoutes;
