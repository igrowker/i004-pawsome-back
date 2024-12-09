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
  const mailContent = `
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Inscripción</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #6AB4A8; color: #333; margin: 0; padding: 0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <tr>
        <td style="text-align: center; color: #08121F; padding-bottom: 20px;">
          <h1 style="font-size: 40px; margin: 0; font-weight: bold;">Confirmación de Inscripción</h1>
          <div style="font-size: 50px; color: #08121F; font-weight: bold; text-transform: uppercase; margin-top: 30px;">PAWSOME!</div>
        </td>
      </tr>
      <tr>
        <td style="font-size: 16px; line-height: 1.5; color: #333;">
          <p>Hola <b>${usuario.name} ${usuario.last_name}</b>,</p>

          <p>Gracias por inscribirte a la oportunidad de voluntariado "<b>${detalleOportunidad.description}</b>" en el refugio "<b>${refugio.name_refugee}</b>". Aquí están los detalles de tu inscripción:</p>

          <div style="background-color: #08121F; padding: 20px; border-radius: 8px; color: white; text-align: left;">
            <p style="font-size: 20px; font-weight: bold; text-align: center; margin: 0; padding-bottom: 15px;">Detalles de tu Inscripción</p>
            <table style="width: 100%; font-size: 14px; color: #fff; margin-bottom: 10px;">
              <tr><td><b>Nombre completo:</b></td><td>${formData.personalData.fullName || `${usuario.name} ${usuario.last_name}`}</td></tr>
              <tr><td><b>Fecha de nacimiento:</b></td><td>${formData.personalData.birth || "No especificada"}</td></tr>
              <tr><td><b>Género:</b></td><td>${formData.personalData.gender || "No especificado"}</td></tr>
              <tr><td><b>Dirección:</b></td><td>${formData.personalData.address || "No especificada"}</td></tr>
              <tr><td><b>Teléfono de contacto:</b></td><td>${formData.personalData.contactTel || "No especificado"}</td></tr>
              <tr><td><b>Email:</b></td><td>${formData.personalData.email || usuario.email}</td></tr>
            </table>

            <div style="font-size: 30px; text-align: center;">
              🐾🐾🐾🐾🐾
            </div>
          </div>

          <div style="font-size: 30px; text-align: center; margin-top: 20px;">
            🐾🐾🐾🐾🐾
          </div>

          <table width="100%" cellspacing="0" cellpadding="5" style="border-top: 2px solid #08121F;">
            <tr><td colspan="2" style="color: #08121F; font-size: 18px;"><b>**Disponibilidad:**</b></td></tr>
            <tr><td><b>Días disponibles:</b></td><td>${formData.availability.availableDays || "No especificados"}</td></tr>
            <tr><td><b>Horas disponibles:</b></td><td>${formData.availability.availableHours}</td></tr>
            <tr><td><b>Frecuencia:</b></td><td>${formData.availability.frecuency || "No especificada"}</td></tr>
          </table>

          <table width="100%" cellspacing="0" cellpadding="5" style="border-top: 2px solid #08121F;">
            <tr><td colspan="2" style="color: #08121F; font-size: 18px;"><b>**Experiencia y habilidades:**</b></td></tr>
            <tr><td><b>Experiencia:</b></td><td>${formData.experienceAndSkills.experience || "No especificada"}</td></tr>
            <tr><td><b>Área de preferencia:</b></td><td>${formData.experienceAndSkills.preferenceArea || "No especificada"}</td></tr>
            <tr><td><b>Conocimientos adicionales:</b></td><td>${formData.experienceAndSkills.knowledge || "No especificados"}</td></tr>
          </table>

          <table width="100%" cellspacing="0" cellpadding="5" style="border-top: 2px solid #08121F;">
            <tr><td colspan="2" style="color: #08121F; font-size: 18px;"><b>**Motivación:**</b></td></tr>
            <tr><td><b>Razón para ser voluntario:</b></td><td>${formData.motivation.volunteer || "No especificada"}</td></tr>
            <tr><td><b>Aprendizajes esperados:</b></td><td>${formData.motivation.learn || "No especificado"}</td></tr>
          </table>

          <table width="100%" cellspacing="0" cellpadding="5" style="border-top: 2px solid #08121F;">
            <tr><td colspan="2" style="color: #08121F; font-size: 18px;"><b>**Preferencias de rol:**</b></td></tr>
            <tr><td><b>Rol deseado:</b></td><td>${formData.rolePreferences.role || "No especificado"}</td></tr>
            <tr><td><b>Trabajo:</b></td><td>${formData.rolePreferences.individualTeam || "No especificado"}</td></tr>
          </table>

          <table width="100%" cellspacing="0" cellpadding="5" style="border-top: 2px solid #08121F;">
            <tr><td colspan="2" style="color: #08121F; font-size: 18px;"><b>**Condiciones médicas:**</b></td></tr>
            <tr><td><b>Condiciones médicas:</b></td><td>${formData.healthConditions.medicalConditions || "No especificadas"}</td></tr>
            <tr><td><b>Alergias:</b></td><td>${formData.healthConditions.alergics || "No especificadas"}</td></tr>
          </table>

          <table width="100%" cellspacing="0" cellpadding="5" style="border-top: 2px solid #08121F;">
            <tr><td colspan="2" style="color: #08121F; font-size: 18px;"><b>**Información adicional:**</b></td></tr>
            <tr><td><b>Detalles adicionales:</b></td><td>${formData.additionalObservations.adicionalInfo || "No especificada"}</td></tr>
          </table>

          <table width="100%" cellspacing="0" cellpadding="5" style="border-top: 2px solid #08121F;">
            <tr><td colspan="2" style="color: #08121F; font-size: 18px;"><b>**Detalles del voluntariado seleccionado:**</b></td></tr>
            <tr><td><b>Nombre:</b></td><td>${formData.selectedVolunteering.volunteeringName || detalleOportunidad.description}</td></tr>
            <tr><td><b>Descripción:</b></td><td>${formData.selectedVolunteering.volunteeringDescription || "No especificada"}</td></tr>
          </table>

          <p>¡Gracias por tu interés en ayudar!</p>

          <div style="text-align: center; margin-top: 40px; font-size: 14px; color: #888;">
            <p>¡El equipo de ${refugio.name_refugee}!</p>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;

  const inlinedHtml = juice(mailContent);
  
  try {
    await mailService.sendEmail({
      to: usuario.email,
      subject: `Confirmación de inscripción: ${detalleOportunidad.description}`,
      html: inlinedHtml
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
  
  

  return {
    message: 'Inscripción exitosa. Se ha enviado un correo de confirmación.',
    refugio: refugio.name_refugee,
    oportunidad: detalleOportunidad.description,
    detallesEnviados: inlinedHtml
  };
};
