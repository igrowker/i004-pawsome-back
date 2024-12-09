import mongoose, { Date } from 'mongoose';
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
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f9;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          color: #ff7f50;
        }
        .header h1 {
          font-size: 40px;
          margin: 0;
          font-weight: bold;
        }
        .pawsome {
          font-size: 50px;
          color: #ff7f50;
          font-family: 'Arial', sans-serif;
          font-weight: bold;
          text-align: center;
          text-transform: uppercase;
          margin-top: 30px;
        }
        .body-text {
          font-size: 16px;
          line-height: 1.5;
          color: #333;
          margin-top: 20px;
        }
        .body-text b {
          color: #ff7f50;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          font-size: 14px;
          color: #888;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #ff7f50;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin-top: 20px;
          text-align: center;
        }
        .button:hover {
          background-color: #ff5733;
        }
      </style>
    </head>
    <body>

      <div class="container">
        <div class="header">
          <h1>Confirmación de Inscripción</h1>
        </div>

        <div class="pawsome">
          PAWSOME!
        </div>

        <div class="body-text">
          <p>Hola <b>${usuario.name} ${usuario.last_name}</b>,</p>

          <p>Gracias por inscribirte a la oportunidad de voluntariado "<b>${detalleOportunidad.description}</b>" en el refugio "<b>${refugio.name_refugee}</b>". Aquí están los detalles de tu inscripción:</p>

          <h3>**Información Personal:**</h3>
          <ul>
            <li><b>Nombre completo:</b> ${formData.personalData.fullName || `${usuario.name} ${usuario.last_name}`}</li>
            <li><b>Fecha de nacimiento:</b> ${formData.personalData.birth || "No especificada"}</li>
            <li><b>Género:</b> ${formData.personalData.gender || "No especificado"}</li>
            <li><b>Dirección:</b> ${formData.personalData.address || "No especificada"}</li>
            <li><b>Teléfono de contacto:</b> ${formData.personalData.contactTel || "No especificado"}</li>
          </ul>

          <h3>**Disponibilidad:**</h3>
          <ul>
            <li><b>Días disponibles:</b> ${formData.availability.availableDays || "No especificados"}</li>
            <li><b>Horas disponibles:</b> ${formData.availability.availableHours}</li>
            <li><b>Frecuencia:</b> ${formData.availability.frecuency || "No especificada"}</li>
          </ul>

          <h3>**Experiencia y habilidades:**</h3>
          <ul>
            <li><b>Experiencia:</b> ${formData.experienceAndSkills.experience || "No especificada"}</li>
            <li><b>Área de preferencia:</b> ${formData.experienceAndSkills.preferenceArea || "No especificada"}</li>
            <li><b>Conocimientos adicionales:</b> ${formData.experienceAndSkills.knowledge || "No especificados"}</li>
          </ul>

          <h3>**Motivación:**</h3>
          <ul>
            <li><b>Razón para ser voluntario:</b> ${formData.motivation.volunteer || "No especificada"}</li>
            <li><b>Aprendizajes esperados:</b> ${formData.motivation.learn || "No especificado"}</li>
          </ul>

          <h3>**Preferencias de rol:**</h3>
          <ul>
            <li><b>Rol deseado:</b> ${formData.rolePreferences.role || "No especificado"}</li>
            <li><b>Trabajo:</b> ${formData.rolePreferences.individualTeam || "No especificado"}</li>
          </ul>

          <h3>**Condiciones médicas:**</h3>
          <ul>
            <li><b>Condiciones médicas:</b> ${formData.healthConditions.medicalConditions || "No especificadas"}</li>
            <li><b>Alergias:</b> ${formData.healthConditions.alergics || "No especificadas"}</li>
          </ul>

          <h3>**Información adicional:**</h3>
          <ul>
            <li><b>Detalles adicionales:</b> ${formData.additionalObservations.adicionalInfo || "No especificada"}</li>
          </ul>

          <h3>**Detalles del voluntariado seleccionado:**</h3>
          <ul>
            <li><b>Nombre:</b> ${formData.selectedVolunteering.volunteeringName || detalleOportunidad.description}</li>
            <li><b>Descripción:</b> ${formData.selectedVolunteering.volunteeringDescription || "No especificada"}</li>
          </ul>

          <p>¡Gracias por tu interés en ayudar!</p>

          <div class="footer">
            <p>¡El equipo de ${refugio.name_refugee}!</p>
          </div>
        </div>
      </div>

    </body>
  </html>
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
