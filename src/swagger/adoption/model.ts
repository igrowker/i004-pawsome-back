
/**
 * @swagger
 * components:
 *   schemas:
 *     AdoptionRequest:
 *       type: object
 *       required:
 *         - animal_id
 *         - adopter_id
 *         - status
 *       properties:
 *         animal_id:
 *           type: string
 *           description: ID del animal al que se refiere la solicitud de adopción
 *           example: "507f191e810c19729de860ea"
 *         adopter_id:
 *           type: string
 *           description: ID del usuario que realiza la solicitud de adopción
 *           example: "507f191e810c19729de860eb"
 *         request_date:
 *           type: string
 *           format: date-time
 *           description: Fecha en que se realizó la solicitud
 *           example: "2024-11-17T12:34:56.789Z"
 *         status:
 *           type: string
 *           description: Estado de la solicitud de adopción
 *           enum:
 *             - "en revisión"
 *             - "aceptada"
 *             - "rechazada"
 *           default: "en revisión"
 *           example: "en revisión"
 *       example:
 *         animal_id: "507f191e810c19729de860ea"
 *         adopter_id: "507f191e810c19729de860eb"
 *         request_date: "2024-11-17T12:34:56.789Z"
 *         status: "en revisión"
 */
