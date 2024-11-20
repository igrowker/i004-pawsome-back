/**
 * @swagger
 * tags:
 *   - name: Animals
 */

/**
 * @swagger
 * /animals:
 *   get:
 *     tags:
 *       - Animals
 *     summary: Obtener una lista de todos los animales
 *     description: 
 *     responses:
 *       200:
 *         description: Lista de animales obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 *       500:
 *         description: Error al obtener la lista de animales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los animales"
 *                 error:
 *                   type: string
 *                   example: "Detalles del error"
 */

/**
 * @swagger
 * /animals/{id}:
 *   get:
 *     tags:
 *       - Animals
 *     summary: Obtener un animal por su ID
 *     description: Retorna los detalles de un animal específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del animal a buscar
 *         schema:
 *           type: string
 *         example: "6739975cabab1984320cdbed"
 *     responses:
 *       200:
 *         description: Animal obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       404:
 *         description: Animal no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró el animal"
 *       500:
 *         description: Error interno al intentar obtener el animal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener el animal"
 *                 error:
 *                   type: string
 *                   example: "Detalles del error"
 */


/**
 * @swagger
 * /animals/{id}:
 *   put:
 *     tags:
 *       - Animals
 *     summary: Actualizar un animal por su ID
 *     description: Actualiza los detalles de un animal específico basándose en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del animal a actualizar
 *         schema:
 *           type: string
 *         example: "6739975cabab1984320cdbed"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/AnimalDto'
 *     responses:
 *       200:
 *         description: Animal actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
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
 *         description: Error interno al intentar actualizar el animal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar el animal"
 *                 error:
 *                   type: string
 *                   example: "Detalles del error"
 */

/**
 * @swagger
 * /animals:
 *   post:
 *     tags:
 *       - Animals
 *     summary: Crear un nuevo animal
 *     description: Crea un nuevo registro de animal en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/components/schemas/AnimalDto'
 *     responses:
 *       201:
 *         description: Animal creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       500:
 *         description: Error al intentar crear el animal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear el animal"
 *                 error:
 *                   type: string
 *                   example: "Detalles del error"
 */