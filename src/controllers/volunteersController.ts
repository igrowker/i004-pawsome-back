import { Request, Response } from 'express';
import * as volunteerService from '../services/volunteersServices';

const handleResponse = (res: Response, data: any, success: boolean, message: string, statusCode: number) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

const handleError = (res: Response, error: any, message: string): void => {
  handleResponse(res, null, false, error instanceof Error ? `${message}: ${error.message}` : message, 500);
};

const handleSuccess = (res: Response, data: any, message: string = 'Operación exitosa'): void => {
  handleResponse(res, data, true, message, 200);
};

export const getVolunteerOpportunities = async (req: Request, res: Response): Promise<void> => {
  try {
    const opportunities = await volunteerService.getVolunteerOpportunities();
    handleSuccess(res, opportunities);
  } catch (error) {
    handleError(res, error, 'Error al obtener las oportunidades de voluntariado');
  }
};

export const getVolunteerOpportunitiesByRefugeeId = async (req: Request, res: Response): Promise<void> => {
  try {
    const refugeId = req.params.refugeeId;
    const volunteerOpportunities = await volunteerService.getOpportunitiesByRefugeeId(refugeId);
    handleSuccess(res, volunteerOpportunities);
  } catch (error) {
    handleError(res, error, 'Error al obtener las oportunidades de voluntariado');
  }
};

export const createVolunteerController = async (req: Request, res: Response) => {
  const { refugeeID } = req.params;
  const { description, requirements, availability } = req.body;

  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
    const userID = (decoded as { sub: string }).sub;

    if (![refugeeID, userID].every(Boolean)) {
      return res.status(400).json({ error: 'Faltan los parámetros necesarios' });
    }

    const newOpportunity = await volunteerService.createVolunteerOpportunity({
      refugee_id: refugeeID,
      user_id: userID,
      description,
      requirements,
      availability,
    });

    res.status(201).json(newOpportunity);
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Ocurrió un error al crear la oportunidad de voluntariado',
    });
  }
};
