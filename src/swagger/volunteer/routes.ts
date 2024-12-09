/**
 * @swagger
 * tags:
 *   - name: volunteer
 *     description: Operaciones relacionadas con oportunidades de voluntariado
 */

/**
 * @swagger
 * /volunteer:
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
 * /volunteer/{id}:
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
 * /volunteer/{id}:
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

/**
 * @swagger
 * /volunteer/{id}:
 *   delete:
 *     tags:
 *       - volunteer
 *     summary: Eliminar oportunidades de voluntariado asociadas a un refugio
 *     description: Elimina todas las oportunidades de voluntariado asociadas al ID de un refugio.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del refugio cuyos voluntariados se eliminarán
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Oportunidades de voluntariado eliminadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Todas las oportunidades de voluntariado asociadas al refugio han sido eliminadas.
 *       404:
 *         description: Refugio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Refugio no encontrado.
 *       500:
 *         description: Error al procesar la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error al intentar eliminar las oportunidades de voluntariado.
 */
/**
 * @swagger
 * /volunteer/{refugioId}/oportunidades:
 *   post:
 *     tags:
 *       - volunteer
 *     summary: Register a volunteer for a specific opportunity in a refuge
 *     description: This endpoint allows a user to register as a volunteer for an opportunity in a specified refuge.
 *     parameters:
 *       - in: path
 *         name: refugioId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the refuge where the opportunity exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oportunidadId:
 *                 type: string
 *                 description: The ID of the volunteering opportunity.
 *               formData:
 *                 type: object
 *                 properties:
 *                   personalData:
 *                     type: object
 *                     properties:
 *                       fullName:
 *                         type: string
 *                         description: Full name of the volunteer.
 *                       birth:
 *                         type: string
 *                         format: date
 *                         description: Birthdate of the volunteer.
 *                       gender:
 *                         type: string
 *                         description: Gender of the volunteer.
 *                       address:
 *                         type: string
 *                         description: Address of the volunteer.
 *                       contactTel:
 *                         type: string
 *                         description: Contact phone number.
 *                       email:
 *                         type: string
 *                         format: email
 *                         description: Email address of the volunteer.
 *                   availability:
 *                     type: object
 *                     properties:
 *                       availableDays:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Days the volunteer is available.
 *                       availableHours:
 *                         type: integer
 *                         description: Number of hours available.
 *                       frecuency:
 *                         type: string
 *                         description: Frequency of availability.
 *                   experienceAndSkills:
 *                     type: object
 *                     properties:
 *                       experience:
 *                         type: string
 *                         description: Previous volunteering or related experience.
 *                       preferenceArea:
 *                         type: string
 *                         description: Preferred area of volunteering.
 *                       knowledge:
 *                         type: string
 *                         description: Additional relevant knowledge.
 *                   motivation:
 *                     type: object
 *                     properties:
 *                       volunteer:
 *                         type: string
 *                         description: Motivation for volunteering.
 *                       learn:
 *                         type: string
 *                         description: Expected learning outcomes.
 *                   rolePreferences:
 *                     type: object
 *                     properties:
 *                       role:
 *                         type: string
 *                         description: Desired role in volunteering.
 *                       individualTeam:
 *                         type: string
 *                         description: Preference for individual or team work.
 *                   healthConditions:
 *                     type: object
 *                     properties:
 *                       medicalConditions:
 *                         type: string
 *                         description: Any medical conditions the volunteer has.
 *                       alergics:
 *                         type: string
 *                         description: Any allergies the volunteer has.
 *                   additionalObservations:
 *                     type: object
 *                     properties:
 *                       adicionalInfo:
 *                         type: string
 *                         description: Additional observations or notes.
 *                   selectedVolunteering:
 *                     type: object
 *                     properties:
 *                       volunteeringId:
 *                         type: string
 *                         description: ID of the volunteering program.
 *                       volunteeringName:
 *                         type: string
 *                         description: Name of the volunteering program.
 *                       volunteeringDescription:
 *                         type: string
 *                         description: Description of the volunteering program.
 *     responses:
 *       200:
 *         description: Successful registration response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inscripción exitosa. Se ha enviado un correo de confirmación."
 *                 refugio:
 *                   type: string
 *                   description: The name of the refuge.
 *                 oportunidad:
 *                   type: string
 *                   description: The description of the volunteering opportunity.
 *                 detallesEnviados:
 *                   type: string
 *                   description: Details of the email sent.
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User ID is missing"
 */
