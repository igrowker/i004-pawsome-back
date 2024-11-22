/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Operaciones relacionadas con la administración del sistema
 */

/**
 * @swagger
 * /admin/dashboard/{refugeId}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Obtener datos del panel de administración
 *     description: Esta ruta permite obtener información del panel de administración, como estadísticas o resúmenes clave del sistema. El parámetro `refugeId` especifica el refugio o área para la que se obtienen los datos.
 *     parameters:
 *       - in: path
 *         name: refugeId
 *         required: true
 *         description: ID del refugio para obtener los datos específicos de ese refugio.
 *         schema:
 *           type: string
 *           example: "1234"
 *     responses:
 *       200:
 *         description: Datos del panel de administración obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Información relevante del panel de administración
 *                   properties:
 *                     users:
 *                       type: integer
 *                       description: Número total de usuarios
 *                       example: 150
 *                     animals:
 *                       type: integer
 *                       description: Número total de animales registrados
 *                       example: 25
 *                     adoptionRequests:
 *                       type: integer
 *                       description: Número total de solicitudes de adopción
 *                       example: 10
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los datos del dashboard"
 */
/**
 * @swagger
 * /promote-to-admin/{userID}:
 *   patch:
 *     summary: Promueve un usuario a administrador
 *     description: Este endpoint permite cambiar el rol de un usuario a "admin".
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         description: El ID del usuario a promover.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: El usuario ha sido promovido a administrador correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El usuario ha sido promovido a admin correctamente
 *       400:
 *         description: Error al promover al usuario, por ejemplo, si el usuario no existe o ya tiene un rol diferente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El usuario ya tiene un rol diferente a "user"
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se encontró el usuario
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ocurrió un error al promover al usuario
 */
