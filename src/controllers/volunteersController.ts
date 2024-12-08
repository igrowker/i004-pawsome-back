import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as volunteerService from '../services/volunteersServices';
import Refugee from '../models/refugeeModel';
import VolunteerOpportunity from '../models/volunteersModel';

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
    const refugeeId = req.params.refugeeId;

    const volunteerOpportunities = await volunteerService.getOpportunitiesByRefugeeId(refugeeId);
    handleSuccess(res, volunteerOpportunities);
  } catch (error) {
    handleError(res, error, 'Error al obtener las oportunidades de voluntariado');
  }
};

export const createVolunteerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, requirements, availability } = req.body;

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
    const userID = (decoded as { userId: string }).userId;

    if (![id, userID].every(Boolean)) {
      return res.status(400).json({ error: 'Faltan los parámetros necesarios' });
    }

    const newOpportunity = await volunteerService.createVolunteerOpportunity({
      refugee_id: id,
      user_id: userID,
      description,
      requirements,
      availability
    });

    const updatedRefugee = await Refugee.findByIdAndUpdate(
      id,
      { $push: { opportunities: newOpportunity._id } },
      { new: true }
    );

    if (!updatedRefugee) {
      return res.status(404).json({ error: 'Refugio no encontrado' });
    }

    res.status(201).json(newOpportunity);
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message || 'Ocurrió un error al crear la oportunidad de voluntariado',
    });
  }
};

export const deleteVolunteerOpportunity = async (req: Request, res: Response): Promise<void> => {
  const { id: refugee_id } = req.params;

  try {
    const result = await volunteerService.deleteVolunteerOpportunity(refugee_id);
    handleSuccess(res, result, "Oportunidades de voluntariado eliminadas");
  } catch (error) {
    handleError(res, error, "Error al eliminar las oportunidades de voluntariado");
  }
};

export const updateVolunteerOpportunity = async (req: Request, res: Response): Promise<void> => {
  const { opportunityId } = req.params; 
  const { description, requirements, availability } = req.body; 

  try {
    const updatedOpportunity = await volunteerService.updateVolunteerOpportunity(opportunityId, {
      description,
      requirements,
      availability,
    });

    handleSuccess(res, updatedOpportunity, "Oportunidad de voluntariado actualizada exitosamente");
  } catch (error) {
    handleError(res, error, "Error al actualizar la oportunidad de voluntariado");
  }
};

export const registerVolunteerController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    const refugioId = req.params.refugioId;
    const { oportunidadId, mensaje, fecha, horasDisponibles, formData } = req.body;

    const result = await volunteerService.registerVolunteer(
      { refugioId, oportunidadId, mensaje, fecha, horasDisponibles, formData },
      userId
    );

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const getVolunteerOpportunitiesController = async (req: Request, res: Response) => {
  try {
    const refugioId = req.params.refugioId;

    const refugio = await Refugee.findById(refugioId).populate('opportunities');
    if (!refugio) {
      return res.status(404).json({ error: 'Refugio no encontrado' });
    }

    const oportunidades = await VolunteerOpportunity.find({ _id: { $in: refugio.opportunities } });

    res.status(200).json({
      refugio: refugio.name_refugee,
      oportunidades
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
