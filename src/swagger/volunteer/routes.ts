/**
 * @swagger
 * tags:
 *   - name: volunteer
 *     description: Operaciones relacionadas con oportunidades de voluntariado
 */

/**
 * @swagger
 * /volunteers:
 *   get:
 *     tags:
 *       - volunteer
 *     summary: Obtener todas las oportunidades de voluntariado
 *     description: Obtiene una lista de todas las oportunidades de voluntariado disponibles.
 *     responses:
 *       200:
 *         description: Lista de oportunidades de voluntariado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/VolunteerOpportunity"
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /volunteers/{id}:
 *   get:
 *     tags:
 *       - volunteer
 *     summary: Obtener oportunidades de voluntariado por ID de refugiado
 *     description: Obtiene todas las oportunidades de voluntariado asociadas a un refugiado específico usando su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del refugiado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de oportunidades de voluntariado para el refugiado especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/VolunteerOpportunity"
 *       404:
 *         description: Refugiado no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /volunteers/{id}:
 *   post:
 *     tags:
 *       - volunteer
 *     summary: Crear una oportunidad de voluntariado para un refugiado específico
 *     description: Crea una nueva oportunidad de voluntariado para un refugiado utilizando su ID como parámetro de ruta.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del refugiado al que se asignará la oportunidad de voluntariado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/VolunteerOpportunity"
 *     responses:
 *       201:
 *         description: Oportunidad de voluntariado creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Oportunidad de voluntariado creada exitosamente
 *       400:
 *         description: Solicitud incorrecta, falta algún campo necesario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Por favor, completa todos los campos requeridos
 *       404:
 *         description: Refugiado no encontrado
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear la oportunidad de voluntariado
 */
