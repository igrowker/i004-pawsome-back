import mongoose, { Date } from 'mongoose';
import VolunteerOpportunity from '../models/volunteersModel';
import Refugee, { IRefugee } from '../models/refugeeModel';
import Usuario from '../models/userModel';
import mailService from './mailService';
import juice from 'juice';

export const getVolunteerOpportunities = async () => {
  return VolunteerOpportunity.find().populate('refugee_id', 'name');
};

export const getOpportunitiesByRefugeeId = async (refugee_id: string) => {

  const objectIdRefugeeId = new mongoose.Types.ObjectId(refugee_id)
  return VolunteerOpportunity.find({ refugee_id: objectIdRefugeeId }).populate('refugee_id', 'name');
};

export const createVolunteerOpportunity = async ({
  refugee_id,
  user_id,
  description,
  requirements,
  availability,
}: {
  refugee_id: string;
  user_id: string;
  description: string;
  requirements: string;
  availability: string;
}) => {
  if (![refugee_id, description, requirements, availability].every(Boolean)) {
    throw new Error("Por favor, completa todos los campos requeridos");
  }

  const opportunity = new VolunteerOpportunity({
    refugee_id,
    user_id,
    description,
    requirements,
    availability
  });

  return opportunity.save();
};

export const deleteVolunteerOpportunity = async (refugee_id: string) => {
  const result = await VolunteerOpportunity.deleteMany({ refugee_id });
  if (result.deletedCount === 0) {
    throw new Error("No se encontró ninguna oportunidad de voluntariado para el refugio especificado");
  }
  return result;
};
export const updateVolunteerOpportunity = async (
  opportunity_id: string,
  updates: {
    description?: string;
    requirements?: string;
    availability?: string;
  }
) => {
  if (!opportunity_id) {
    throw new Error("Opporunity ID is required");
  }

  const updatedOpportunity = await VolunteerOpportunity.findByIdAndUpdate(
    opportunity_id,
    updates,
    { new: true }
  );

  if (!updatedOpportunity) {
    throw new Error("Opportunity not found");
  }

  return updatedOpportunity;
};



interface VolunteerRegistrationInput {
  formData: {
    personalData: {
      fullName: string;
      birth: string;
      gender: string;
      address: string;
      contactTel: string;
      email: string;
    };
    availability: {
      availableDays: string;
      availableHours: string;
      frecuency: string;
    };
    experienceAndSkills: {
      experience: string;
      preferenceArea: string;
      knowledge: string;
    };
    motivation: {
      volunteer: string;
      learn: string;
    };
    rolePreferences: {
      role: string;
      individualTeam: string;
    };
    healthConditions: {
      medicalConditions: string;
      alergics: string;
    };
    additionalObservations: {
      adicionalInfo: string;
    };
    selectedVolunteering: {
      volunteeringId: string;
      volunteeringName: string;
      volunteeringDescription: string;
    };
  };
  oportunidadId: string;
  refugioId: string; 
}

export const registerVolunteer = async (input: VolunteerRegistrationInput, userId: string) => {
  const { formData, oportunidadId, refugioId } = input;

  const refugio: IRefugee | null = await Refugee.findById(refugioId).populate('opportunities');
  if (!refugio) {
    throw new Error('Refugio no encontrado');
  }

  const oportunidad = refugio.opportunities.find(op => op._id.toString() === oportunidadId);
  if (!oportunidad) {
    throw new Error('Oportunidad no encontrada en este refugio');
  }

  const detalleOportunidad = await VolunteerOpportunity.findById(oportunidad);
  if (!detalleOportunidad) {
    throw new Error('Detalles de la oportunidad no encontrados');
  }

  const usuario: any | null = await Usuario.findById(userId);
  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }
 
};
