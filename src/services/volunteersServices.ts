import mongoose from 'mongoose';
import VolunteerOpportunity from '../models/volunteersModel';
import Refugee, { IRefugee } from '../models/refugeeModel';
import Usuario from '../models/userModel';
import mailService from './mailService';

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
  refugioId: string;
  oportunidadId: string;
  mensaje: string;
  fecha: string;
  horasDisponibles: number;
  formData: any;
}

export const registerVolunteer = async (input: VolunteerRegistrationInput, userId: string) => {
  const { refugioId, oportunidadId, mensaje, fecha, horasDisponibles, formData } = input;

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

  const { 
    personalData, 
    availability, 
    experienceAndSkills, 
    motivation, 
    rolePreferences, 
    healthConditions, 
    additionalObservations, 
    selectedVolunteering 
  } = formData;

  const mailContent = `
Hola ${usuario.name} ${usuario.last_name},

  Gracias por inscribirte a la oportunidad de voluntariado "${detalleOportunidad.description}" en el refugio "${refugio.name_refugee}". Aquí están los detalles de tu inscripción:

  **Información Personal:**
  - Nombre completo: ${personalData.fullName || `${usuario.name} ${usuario.last_name}`}
  - Fecha de nacimiento: ${personalData.birth || "No especificada"}
  - Género: ${personalData.gender || "No especificado"}
  - Dirección: ${personalData.address || "No especificada"}
  - Teléfono de contacto: ${personalData.contactTel || "No especificado"}
  - Email: ${personalData.email || usuario.email}

  **Disponibilidad:**
  - Días disponibles: ${availability.availableDays || "No especificados"}
  - Horas disponibles: ${availability.availableHours || horasDisponibles}
  - Frecuencia: ${availability.frecuency || "No especificada"}

  **Experiencia y habilidades:**
  - Experiencia: ${experienceAndSkills.experience || "No especificada"}
  - Área de preferencia: ${experienceAndSkills.preferenceArea || "No especificada"}
  - Conocimientos adicionales: ${experienceAndSkills.knowledge || "No especificados"}

  **Motivación:**
  - Razón para ser voluntario: ${motivation.volunteer || "No especificada"}
  - Aprendizajes esperados: ${motivation.learn || "No especificado"}

  **Preferencias de rol:**
  - Rol deseado: ${rolePreferences.role || "No especificado"}
  - Trabajo: ${rolePreferences.individualTeam || "No especificado"}

  **Condiciones médicas:**
  - Condiciones médicas: ${healthConditions.medicalConditions || "No especificadas"}
  - Alergias: ${healthConditions.alergics || "No especificadas"}

  **Información adicional:**
  - ${additionalObservations.adicionalInfo || "No especificada"}

  **Detalles del voluntariado seleccionado:**
  - Nombre: ${selectedVolunteering.volunteeringName || detalleOportunidad.description}
  - Descripción: ${selectedVolunteering.volunteeringDescription || "No especificada"}

  **Mensaje adicional:**
  "${mensaje || "Sin mensaje adicional"}"

  ¡Gracias por tu interés en ayudar!
  `;

  await mailService.sendEmail({
    to: usuario.email,
    subject: `Confirmación de inscripción: ${detalleOportunidad.description}`,
    text: mailContent
  });

  return {
    message: 'Inscripción exitosa. Se ha enviado un correo de confirmación.',
    refugio: refugio.name_refugee,
    oportunidad: detalleOportunidad.description,
    detallesEnviados: mailContent
  };
};