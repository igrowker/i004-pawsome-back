import { Request, Response } from "express";
import { CreateAdmin, getDashboardData } from "../services/adminService";
import { deleteUserByIdService } from "../services/userService";
import RefugeeNeed from "../models/refugeeNeedModel";
import Usuario from "../models/userModel";
import Refugee from "../models/refugeeModel";
import bcrypt from 'bcrypt'

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const dashboardData = await getDashboardData();
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
    const user = await Usuario.findById(userId);

    if (!user) {
      return
    }

    if (user.role === 'refugee') {
      const refugeeData = await Refugee.findOneAndDelete({ user_id: user._id });

      if (!refugeeData) {
        return
      }
    }

    await Usuario.findByIdAndDelete(userId);

    res.status(200).json({ message: "Usuario y su refugio eliminado correctamente" });
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

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  const { name, last_name, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
      const admin = await Usuario.create({
          name,
          last_name,
          password: hashedPassword,
          email,
          role: 'admin',
      });
      res.status(201).json({
          message: 'Admin creado exitosamente',
          admin_id: admin.id,
      });
  } catch (error) {
      res.status(500).json({
          message: 'Error al crear el admin',
          error: (error as Error).message,
      });
  }
};
