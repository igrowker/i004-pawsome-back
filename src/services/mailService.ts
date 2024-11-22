import nodemailer from "nodemailer";
import { MailConfig } from "../config/mailConfig";

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
      throw new Error("Error al enviar el correo: ");
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

}

export default new MailService();
