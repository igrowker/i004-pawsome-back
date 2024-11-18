
/**
 * @swagger
 * components:
 *   schemas:
 *     ActivityLog:
 *       type: object
 *       required:
 *         - action
 *         - user_id
 *         - createdAt
 *       properties:
 *         action:
 *           type: string
 *           description: Acción realizada
 *           example: "Usuario creado"
 *         user_id:
 *           type: string
 *           description: ID del usuario que realizó la acción
 *           example: "507f191e810c19729de860ea"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la acción
 *           example: "2024-11-17T12:34:56.789Z"
 *       example:
 *         action: "Usuario creado"
 *         user_id: "507f191e810c19729de860ea"
 *         createdAt: "2024-11-17T12:34:56.789Z"
 */
