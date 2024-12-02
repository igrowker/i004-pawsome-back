/**
 * @swagger
 * tags:
 *   - name: Adoption
 *     description: Operaciones relacionadas con las solicitudes de adopción
 */

/**
 * @swagger
 * /adoption-request/{animal_id}:
 *   post:
 *     tags:
 *       - Adoption
 *     summary: Crear una solicitud de adopción
 *     description: Permite crear una nueva solicitud de adopción para un animal. Se envía un correo electrónico al adoptante con los detalles.
 *     parameters:
 *       - in: path
 *         name: animal_id
 *         required: true
 *         description: ID del animal que se desea adoptar
 *         schema:
 *           type: string
 *           example: "507f191e810c19729de860ea"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - details
 *               - compatibility
 *               - location
 *               - housingSituation
 *               - experience
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del adoptante
 *                 example: "Juan Pérez"
 *               details:
 *                 type: string
 *                 description: Detalles adicionales sobre la solicitud de adopción
 *                 example: "Estoy interesado en adoptar porque..."
 *               compatibility:
 *                 type: string
 *                 description: Información sobre la compatibilidad del adoptante con el animal
 *                 example: "Buena compatibilidad con perros activos."
 *               location:
 *                 type: string
 *                 description: Ubicación del adoptante
 *                 example: "Ciudad de México"
 *               housingSituation:
 *                 type: string
 *                 description: Situación de vivienda del adoptante
 *                 example: "Casa con jardín"
 *               experience:
 *                 type: boolean
 *                 description: Indica si el adoptante tiene experiencia previa con mascotas
 *                 example: true
 *     responses:
 *       202:
 *         description: Solicitud de adopción creada correctamente y correos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Solicitud de adopción creada correctamente y correos enviados"
 *                 adoption:
 *                   type: object
 *                   description: Datos de la adopción creada
 *       403:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no autenticado"
 *       404:
 *         description: Animal no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Animal no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 */

/**
 * @swagger
 * /adoption-request/{id}:
 *   put:
 *     tags:
 *       - Adoption
 *     summary: Actualizar el estado de una solicitud de adopción
 *     description: Permite modificar el estado de una solicitud de adopción existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "507f191e810c19729de860ea"
 *         description: ID de la solicitud de adopción que se desea actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: Nuevo estado para la solicitud.
 *                 enum:
 *                   - "en revisión"
 *                   - "aceptada"
 *                   - "rechazada"
 *                 example: "aceptada"
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado actualizado correctamente"
 *                 adoption:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "507f191e810c19729de860ea"
 *                     status:
 *                       type: string
 *                       example: "aceptada"
 *       400:
 *         description: Solicitud inválida o parámetros faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faltan parámetros requeridos"
 *       404:
 *         description: Solicitud de adopción no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Solicitud de adopción no encontrada"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
