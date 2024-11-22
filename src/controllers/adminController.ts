import { Request, Response } from "express";
import { CreateAdmin, getDashboardData } from "../services/adminService";
import { deleteUserByIdService } from "../services/userService";
import RefugeeNeed from "../models/refugeeNeedModel";

export const getDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const refugeId = req.params.refugeId;
    const dashboardData = await getDashboardData(refugeId);
    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? `Error al obtener el dashboard: ${error.message}`
          : "Error desconocido al obtener los datos del dashboard",
    });
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const deletedUser = await deleteUserByIdService(userId);

    if (!deletedUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar usuario",
      error: (error as Error).message,
    });
  }
};

export const deleteRefugeeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { refugeeId } = req.params;

  try {
    await RefugeeNeed.deleteMany({ refugee_id: refugeeId });

    const deletedRefugee = await RefugeeNeed.findByIdAndDelete(refugeeId);

    if (!deletedRefugee) {
      res.status(404).json({ message: "Refugiado no encontrado" });
      return;
    }

    res.status(200).json({ message: "Refugiado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar refugiado",
      error: (error as Error).message,
    });
  }
};
export const createAdminController = async (req: Request, res: Response) => {
  const { userID } = req.params;

  try {
    await CreateAdmin(userID);

    res.status(200).json({
      message: "El usuario ha sido promovido a admin correctamente",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        error: error.message || "Ocurrió un error al promover al usuario",
      });
    } else {
      res.status(400).json({
        error: "Ocurrió un error desconocido al promover al usuario",
      });
    }
  }
};
