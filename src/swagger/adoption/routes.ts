/**
 * @swagger
 * tags:
 *   - name: Adoption
 *     description: Operaciones relacionadas con las solicitudes de adopción
 */

/**
 * @swagger
 * /adoption-request:
 *   post:
 *     tags:
 *       - Adoption
 *     summary: Crear una solicitud de adopción
 *     description: Esta ruta permite crear una nueva solicitud de adopción para un animal.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - animal_id
 *               - adopter_id
 *               - status
 *             properties:
 *               animal_id:
 *                 type: string
 *                 description: ID del animal que se desea adoptar
 *                 example: "507f191e810c19729de860ea"
 *               adopter_id:
 *                 type: string
 *                 description: ID del adoptante
 *                 example: "507f191e810c19729de860ab"
 *               request_date:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de la solicitud de adopción
 *                 example: "2024-11-17T10:00:00Z"
 *               status:
 *                 type: string
 *                 description: Estado de la solicitud
 *                 enum:
 *                   - "en revisión"
 *                   - "aceptada"
 *                   - "rechazada"
 *                 example: "en revisión"
 *     responses:
 *       200:
 *         description: Solicitud de adopción creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Solicitud de adopción creada exitosamente"
 *       400:
 *         description: Datos de la solicitud inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faltan parámetros requeridos"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
