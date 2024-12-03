/**
 * @swagger
 * tags:
 *   - name: refugee
 *     description: Operaciones relacionadas con refugiados
 */

/**
 * @swagger
 * /refugees:
 *   get:
 *     tags:
 *       - refugee
 *     summary: Obtener la lista de refugiados
 *     description: Devuelve una lista de todos los refugiados registrados.
 *     responses:
 *       200:
 *         description: Lista de refugiados obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del refugiado
 *                     example: "abc123"
 *                   name:
 *                     type: string
 *                     description: Nombre del refugiado
 *                     example: "Juan Pérez"
 *                   needs:
 *                     type: array
 *                     description: Necesidades del refugiado
 *                     items:
 *                       type: string
 *                       example: "Abrigo"
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /refugees/{id}/needs:
 *   put:
 *     tags:
 *       - refugee
 *     summary: Actualizar las necesidades de un refugiado
 *     description: Permite actualizar las necesidades de un refugiado específico por su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del refugiado cuyas necesidades se van a actualizar
 *         schema:
 *           type: string
 *           example: "abc123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               needs:
 *                 type: array
 *                 description: Nuevas necesidades del refugiado
 *                 items:
 *                   type: string
 *                   example: "Ropa de invierno"
 *     responses:
 *       200:
 *         description: Necesidades actualizadas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Necesidades actualizadas con éxito
 *       400:
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Falta algún campo requerido
 *       404:
 *         description: Refugiado no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Refugiado no encontrado
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al actualizar las necesidades
 */

/**
 * @swagger
 * /refugees/{id}:
 *   get:
 *     tags:
 *       - refugee
 *     summary: Obtener un refugiado por su ID
 *     description: Devuelve la información de un refugiado específico basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           description: ID único del refugiado
 *         example: "63f53a4e7125b9c1b78c1f24"
 *     responses:
 *       200:
 *         description: Refugiado encontrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del refugiado
 *                   example: "63f53a4e7125b9c1b78c1f24"
 *                 name_refugee:
 *                   type: string
 *                   description: Nombre del refugiado
 *                   example: "Juan Pérez"
 *                 description:
 *                   type: string
 *                   description: Breve descripción del refugiado
 *                   example: "Refugiado en busca de apoyo médico y alimentos"
 *                 img:
 *                   type: string
 *                   description: URL de la imagen del refugiado
 *                   example: "https://res.cloudinary.com/dfktz8zkt/image/upload/v1732301708/ur547ht6w6rjuqq2diad.png"
 *                 pets:
 *                   type: array
 *                   description: Lista de IDs de las mascotas asociadas
 *                   items:
 *                     type: string
 *                     example: "63f53a4e7125b9c1b78c1f25"
 *       404:
 *         description: Refugiado no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "No se encontró un refugio con el ID proporcionado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Ocurrió un error al intentar obtener el refugio."
 */
