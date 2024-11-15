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

export const createVolunteerOpportunity = async (req: Request, res: Response): Promise<void> => {
  try {
    const opportunity = await volunteerService.createVolunteerOpportunity(req.body);
    handleSuccess(res, opportunity, 'Oportunidad de voluntariado creada exitosamente');
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Por favor, completa todos los campos requeridos") {
      handleResponse(res, null, false, error.message, 400);
    } else {
      handleError(res, error, 'Error al crear la oportunidad de voluntariado');
    }
  }
};
