/**
 * @swagger
 * components:
 *   schemas:
 *     VolunteerOpportunity:
 *       type: object
 *       required:
 *         - refugee_id
 *         - description
 *         - requirements
 *         - availability
 *       properties:
 *         refugee_id:
 *           type: string
 *           description: ID del refugio asociado a la oportunidad de voluntariado
 *           example: "507f191e810c19729de860ea"
 *         description:
 *           type: string
 *           description: Descripción de la oportunidad de voluntariado
 *           example: "Ayudar a organizar eventos de recaudación de fondos"
 *         requirements:
 *           type: string
 *           description: Requisitos para aplicar a la oportunidad de voluntariado
 *           example: "Experiencia en organización de eventos, disponibilidad los fines de semana"
 *         availability:
 *           type: string
 *           description: Disponibilidad temporal para participar en la oportunidad
 *           example: "lunes a viernes de 9 AM a 3 PM"
 *       example:
 *         description: "Ayudar a organizar eventos de recaudación de fondos"
 *         requirements: "Experiencia en organización de eventos, disponibilidad los fines de semana"
 *         availability: "lunes a viernes de 9 AM a 3 PM"
 */
