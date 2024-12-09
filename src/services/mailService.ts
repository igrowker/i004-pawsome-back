import nodemailer from "nodemailer";
import { MailConfig } from "../config/mailConfig";
import { postAdoptionDto } from "../dtos/postAdoption.dto";
import { IAnimal } from "../models/animalModel";
import juice from "juice";

class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(MailConfig);
  }

  async confirmCambioDePassword(email: string, name: string, password: string) {
    const subject = "Confirmación de Cambio de Contraseña";
    const html = `
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Cambio de Contraseña</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #6AB4A8; color: #333; margin: 0; padding: 0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="text-align: center; color: #08121F; padding-bottom: 20px;">
              <h1 style="font-size: 40px; margin: 0; font-weight: bold;">Confirmación de Cambio de Contraseña</h1>
              <div style="font-size: 50px; color: #08121F; font-weight: bold; text-transform: uppercase; margin-top: 30px;">PAWSOME!</div>
            </td>
          </tr>
          <tr>
            <td style="font-size: 16px; line-height: 1.5; color: #333;">
              <p>Hola <b>${name}</b>,</p>
              <p>Tu contraseña ha sido actualizada con éxito.</p>
              <p>Tu nueva contraseña es: <strong>${password}</strong></p>
              <p>Si no realizaste este cambio, por favor contacta con soporte de inmediato.</p>
  
              <div style="font-size: 30px; text-align: center; margin-top: 20px;">
                🐾🐾🐾🐾🐾
              </div>
  
              <div style="text-align: center; margin-top: 40px; font-size: 14px; color: #888;">
                <p>¡El equipo de Mi App!</p>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  
    const inlinedHtml = juice(html);
  
    try {
      const info = await this.transporter.sendMail({
        from: `"Mi App" <${MailConfig.auth.user}>`,
        to: email,
        subject,
        html: inlinedHtml, 
      });
      return info;
    } catch (error) {
      throw new Error("Error al enviar el correo: ");
    }
  }

  async cambioPasswordMail(email: string, name: string, resetUrl: string) {
    const subject = "Solicitud de cambio de contraseña";
    const html = `
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Solicitud de Cambio de Contraseña</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #6AB4A8; color: #333; margin: 0; padding: 0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="text-align: center; color: #08121F; padding-bottom: 20px;">
              <h1 style="font-size: 40px; margin: 0; font-weight: bold;">Solicitud de Cambio de Contraseña</h1>
              <div style="font-size: 50px; color: #08121F; font-weight: bold; text-transform: uppercase; margin-top: 30px;">PAWSOME!</div>
            </td>
          </tr>
          <tr>
            <td style="font-size: 16px; line-height: 1.5; color: #333;">
              <p>Hola <b>${name}</b>,</p>
              <p>Hemos recibido una solicitud para cambiar tu contraseña.</p>
              <p>Si fuiste tú, por favor haz clic en el siguiente enlace para restablecer tu contraseña:</p>
              <p style="text-align: center;">
                <a href="${resetUrl}" style="background-color: #08121F; color: #fff; padding: 12px 20px; font-size: 18px; border-radius: 5px; text-decoration: none; font-weight: bold;">Restablecer mi contraseña</a>
              </p>
              <p>Si no solicitaste este cambio, por favor ignora este correo.</p>
  
              <div style="font-size: 30px; text-align: center; margin-top: 20px;">
                🐾🐾🐾🐾🐾
              </div>
  
              <div style="text-align: center; margin-top: 40px; font-size: 14px; color: #888;">
                <p>¡El equipo de Mi App!</p>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  
    const inlinedHtml = juice(html);
  
    try {
      const info = await this.transporter.sendMail({
        from: `"Mi App" <${MailConfig.auth.user}>`,
        to: email,
        subject,
        html: inlinedHtml, 
      });
      return info;
    } catch (error) {
      throw new Error("Error al enviar el correo de cambio de contraseña: ");
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
  
    const htmlContent = `
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Detalles de la Adopción</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #6AB4A8; color: #333; margin: 0; padding: 0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="text-align: center; color: #08121F; padding-bottom: 20px;">
              <h1 style="font-size: 36px; color: #2c3e50; margin: 0; font-weight: bold;">Pawsome</h1>
              <h3>Detalles de la adopción</h3>
            </td>
          </tr>
          <tr>
            <td>
              ${adoptionDetails}
              <div style="font-size: 30px; text-align: center; margin-top: 20px;">
                🐾🐾🐾🐾🐾
              </div>
              <div style="text-align: center; margin-top: 40px; font-size: 14px; color: #888;">
                <p>¡Gracias por adoptar!</p>
              </div>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
  
    const inlinedHtml = juice(htmlContent);
  
    return { html: inlinedHtml };
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
