import { Request, Response } from 'express';
import { getDashboardData } from '../services/adminService';

export const getDashboard = async (req: Request, res: Response): Promise<void> => {
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
      message: error instanceof Error ? `Error al obtener el dashboard: ${error.message}` : 
      'Error desconocido al obtener los datos del dashboard',
    });
  }
};
