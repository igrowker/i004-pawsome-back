/**
 * @swagger
 * tags:
 *   - name: user
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtiene la lista de todos los usuarios
 *     description: Recupera todos los usuarios registrados en el sistema.
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error al obtener los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los usuarios"
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Recupera los detalles de un usuario específico utilizando su ID.
 *     tags:
 *       - user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener el usuario"
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags:
 *       - user
 *     summary: Actualizar el usuario por su ID
 *     description: Actualiza los detalles de un usuario específico basándose en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del usuario a actualizar
 *         schema:
 *           type: string
 *         example: "6739975cabab1984320cdbed"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/UserDto'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: Error interno al intentar actualizar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar el usuario"
 *                 error:
 *                   type: string
 *                   example: "Detalles del error"
 */