import { Request, Response } from 'express';
import MaterialDonation from '../models/materialDonationModel';

export const createMaterialDonation = async (req: Request, res: Response) => {
  try {
    const { id, name, quantity, description, materialStatus, donation_request_id } = req.body;

    const materialDonation = new MaterialDonation({
      id,
      name,
      quantity,
      description,
      materialStatus,
      donation_request_id,
    });

    await materialDonation.save();
    res.status(201).json({ message: 'Donación de material creada exitosamente', materialDonation });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la donación de material', error });
  }
};