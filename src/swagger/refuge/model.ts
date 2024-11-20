/**
 * @swagger
 * components:
 *   schemas:
 *     RefugeeNeed:
 *       type: object
 *       required:
 *         - refugee_id
 *         - item
 *         - quantity
 *         - urgency
 *       properties:
 *         refugee_id:
 *           type: string
 *           description: ID del refugio o usuario asociado a la necesidad
 *           example: "507f191e810c19729de860ea"
 *         item:
 *           type: string
 *           description: Nombre del artículo que se necesita
 *           example: "Comida"
 *         quantity:
 *           type: integer
 *           description: Cantidad del artículo que se necesita
 *           example: 100
 *         urgency:
 *           type: string
 *           description: Nivel de urgencia de la necesidad (ej. alta, media, baja)
 *           example: "alta"
 *       example:
 *         refugee_id: "507f191e810c19729de860ea"
 *         item: "Comida"
 *         quantity: 100
 *         urgency: "alta"
 */
