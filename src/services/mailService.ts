import nodemailer from "nodemailer";
import { MailConfig } from "../config/mailConfig";
import { postAdoptionDto } from "../dtos/postAdoption.dto";
import { IAnimal } from "../models/animalModel";
import { IRefugee } from "../models/refugeeModel";
import { generatePDF } from "../config/pdfConfig";

class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(MailConfig);
  }

  async confirmCambioDePassword(email: string, name: string, password: string) {
    const subject = "Confirmación de Cambio de Contraseña";
    const html = `
      <h1>Hola, ${name}</h1>
      <p>Tu contraseña ha sido actualizada con éxito.</p>
      <p>Tu nueva contraseña es: <strong>${password}</strong></p>
      <p>Si no realizaste este cambio, por favor contacta con soporte de inmediato.</p>
    `;

    try {
      const info = await this.transporter.sendMail({
        from: `"Mi App" <${MailConfig.auth.user}>`,
        to: email,
        subject,
        html,
      });
      return info;
    } catch (error) {
      throw new Error("Error al enviar el correo: " );
    }
  }

  async cambioPasswordMail(email: string, name: string, resetUrl: string) {
    const subject = "Solicitud de cambio de contraseña";
    const html = `
      <h1>Hola, ${name}</h1>
      <p>Hemos recibido una solicitud para cambiar tu contraseña.</p>
      <p>Si fuiste tú, por favor haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetUrl}">Restablecer mi contraseña</a>
      <p>Si no solicitaste este cambio, por favor ignora este correo.</p>
    `;

    try {
      const info = await this.transporter.sendMail({
        from: `"Mi App" <${MailConfig.auth.user}>`,
        to: email,
        subject,
        html,
      });
      return info;
    } catch (error) {
      throw new Error("Error al enviar el correo de cambio de contraseña: " );
    }
  }

  async getAdopterEmailTemplate(
    useremail: string,
    adoptante: postAdoptionDto,
    animal: IAnimal,
    adoptionStatus: string,
  ) {
    const adoptionDetails = `
      <div style="padding: 20px; border: 2px solid #000; border-radius: 8px; background-color: #f9f9f9; margin-top: 20px;">
        <p><strong>Adoptante:</strong> ${adoptante.name}</p>
        <p><strong>Correo:</strong> ${useremail}</p>
        <p><strong>Detalles de la adopción:</strong></p>
        <div style="padding: 10px; border-top: 2px solid #000; margin-top: 10px;">
          <p><strong>Nombre del animal:</strong> ${animal.name}</p>
          <p><strong>Edad:</strong> ${animal.age} años</p>
          <p><strong>Especie:</strong> ${animal.species}</p>
          <p><strong>Descripción del animal:</strong> ${animal.description}</p>
          <p><strong>Compatibilidad:</strong> ${adoptante.compatibility}</p>
          <p><strong>Sitio de vivienda:</strong> ${adoptante.housingSituation}</p>
          <p><strong>Experiencia:</strong> ${adoptante.experience ? 'Sí' : 'No'}</p>
          <p><strong>Ubicación:</strong> ${adoptante.location}</p>
          <p><strong>Estado de la adopción:</strong> ${adoptionStatus || 'En revisión'}</p>
        </div>
      </div>
    `;

    // HTML para el correo
    const htmlContent = `
      <div style="text-align: center; font-family: Arial, sans-serif;">
        <h1 style="font-size: 36px; color: #2c3e50;">Pawsome</h1>
        <h3>Detalles de la adopción</h3>
        ${adoptionDetails}
      </div>
    `;

    return { html: htmlContent };
  }



  // async getRefugeeEmailTemplate(adoptante: postAdoptionDto, animal: IAnimal, adoptionStatus: string, refuge: IRefugee) {
  //   return `
  //     <h3>Detalles de la solicitud de adopción</h3>
  //     <p><strong>Adoptante:</strong> ${adoptante.name}</p>
  //     <p><strong>Correo:</strong> ${adoptante.}</p>
  //     <p><strong>Detalles de la adopción:</strong></p>
  //     <p><strong>Nombre del animal:</strong> ${animal.name}</p>
  //     <p><strong>Edad:</strong> ${animal.age} años</p>
  //     <p><strong>Especie:</strong> ${animal.species}</p>
  //     <p><strong>Descripción del animal:</strong> ${animal.description}</p>
  //     <p><strong>Compatibilidad:</strong> ${adoptante.compatibility}</p>
  //     <p><strong>Sitio de vivienda:</strong> ${adoptante.housingSituation}</p>
  //     <p><strong>Experiencia:</strong> ${adoptante.experience ? "Sí" : "No"}</p>
  //     <p><strong>Ubicación:</strong> ${adoptante.location}</p>
  //     <p><strong>Estado de la adopción:</strong> ${adoptionStatus || 'En revisión'}</p>
  //     <p><strong>Fecha de la solicitud:</strong> ${adoptante.request_date}</p>
  //     <h3>Información del refugio</h3>
  //     <p><strong>Nombre del refugio:</strong> ${refuge.name_refugee}</p>
  //     <p><strong>Descripción del refugio:</strong> ${refuge.description}</p>
  //     <p><strong>Contacto:</strong> ${refuge.user_id}</p>
  //   `;
  // }

  // Función para enviar el correo
  async sendEmail(mailOptions: nodemailer.SendMailOptions) {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error("Error al enviar el correo: " + error);
    }
  }
}

export default new MailService();
