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

/**
 * @swagger
 * /user/favorites/{userId}:
 *   get:
 *     tags:
 *       - favorites
 *     summary: Obtener favoritos del usuario
 *     description: Devuelve una lista de elementos favoritos del usuario por su ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID único del usuario
 *         schema:
 *           type: string
 *         example: "6739975cabab1984320cdbed"
 *     responses:
 *       200:
 *         description: Lista de favoritos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["item1", "item2", "item3"]
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener favoritos
 * 
 *   post:
 *     tags:
 *       - favorites
 *     summary: Agregar un favorito
 *     description: Agrega un elemento a la lista de favoritos del usuario.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID único del usuario
 *         schema:
 *           type: string
 *         example: "6739975cabab1984320cdbed"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favorite:
 *                 type: string
 *                 description: ID del elemento favorito a agregar
 *                 example: "item4"
 *     responses:
 *       201:
 *         description: Favorito agregado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al agregar favorito
 * 
 *   delete:
 *     tags:
 *       - favorites
 *     summary: Eliminar un favorito
 *     description: Elimina un elemento de la lista de favoritos del usuario.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID único del usuario
 *         schema:
 *           type: string
 *         example: "6739975cabab1984320cdbed"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favorite:
 *                 type: string
 *                 description: ID del elemento favorito a eliminar
 *                 example: "item4"
 *     responses:
 *       200:
 *         description: Favorito eliminado exitosamente
 *       404:
 *         description: Usuario o favorito no encontrado
 *       500:
 *         description: Error al eliminar favorito
 */
