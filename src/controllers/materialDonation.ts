import { Request, Response } from "express";
import MaterialDonation from "../models/materialDonationModel";

export const createMaterialDonation = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      user_id,
      quantity,
      description,
      materialStatus,
      donation_request_id,
    } = req.body;

    const materialDonation = new MaterialDonation({
      id,
      name,
      user_id,
      quantity,
      description,
      materialStatus,
      donation_request_id,
    });

    await materialDonation.save();
    res.status(201).json({
      message: "Donación de material creada exitosamente",
      materialDonation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la donación de material", error });
  }
};

export const getMaterialDonationsByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { user_id } = req.params;

    const materialDonations = await MaterialDonation.find({ user_id });

    res.status(200).json({
      message: "Donaciones obtenidas exitosamente",
      materialDonations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las donaciones",
      error,
    });
  }
};

export const updateMaterialDonationQuantity = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ message: "Cantidad inválida" });
    }

    const updatedMaterialDonation = await MaterialDonation.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updatedMaterialDonation) {
      return res.status(404).json({ message: "Donación no encontrada" });
    }

    res.status(200).json({
      message: "Cantidad actualizada exitosamente",
      materialDonation: updatedMaterialDonation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la cantidad",
      error,
    });
  }
};
