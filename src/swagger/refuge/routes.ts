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
