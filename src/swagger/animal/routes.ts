/**
 * @swagger
 * tags:
 *   - name: Animals
 *     description: Operaciones relacionadas con los animales
 */

/**
 * @swagger
 * /animals:
 *   get:
 *     tags:
 *       - Animals
 *     summary: Obtener una lista de todos los animales
 *     description: Esta ruta permite obtener todos los animales registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de animales obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del animal
 *                   name:
 *                     type: string
 *                     description: Nombre del animal
 *                   species:
 *                     type: string
 *                     description: Especie del animal
 *                   adoption_status:
 *                     type: string
 *                     description: Estado de adopción del animal
 *                     enum:
 *                       - disponible
 *                       - en proceso
 *                       - adoptado
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del registro del animal
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
 */

/**
 * @swagger
 * /animals/{id}:
 *   get:
 *     tags:
 *       - Animals
 *     summary: Obtener información de un animal específico
 *     description: Esta ruta permite obtener los detalles de un animal específico usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del animal
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del animal obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del animal
 *                 name:
 *                   type: string
 *                   description: Nombre del animal
 *                 species:
 *                   type: string
 *                   description: Especie del animal
 *                 breed:
 *                   type: string
 *                   description: Raza del animal
 *                 health_status:
 *                   type: string
 *                   description: Estado de salud del animal
 *                 description:
 *                   type: string
 *                   description: Descripción del animal
 *                 adoption_status:
 *                   type: string
 *                   description: Estado de adopción del animal
 *                   enum:
 *                     - disponible
 *                     - en proceso
 *                     - adoptado
 *                 photos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: URL de la foto del animal
 *       404:
 *         description: Animal no encontrado
 *       500:
 *         description: Error al obtener el animal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al obtener el animal"
 */

/**
 * @swagger
 * /animals/{id}:
 *   put:
 *     tags:
 *       - Animals
 *     summary: Actualizar información de un animal
 *     description: Esta ruta permite actualizar la información de un animal específico usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del animal
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del animal
 *               age:
 *                 type: integer
 *                 description: Edad del animal
 *               species:
 *                 type: string
 *                 description: Especie del animal
 *               breed:
 *                 type: string
 *                 description: Raza del animal
 *               health_status:
 *                 type: string
 *                 description: Estado de salud del animal
 *               description:
 *                 type: string
 *                 description: Descripción del animal
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: URL de la foto del animal
 *               adoption_status:
 *                 type: string
 *                 enum:
 *                   - disponible
 *                   - en proceso
 *                   - adoptado
 *                 description: Estado de adopción del animal
 *     responses:
 *       200:
 *         description: Animal actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Animal actualizado correctamente"
 *       404:
 *         description: Animal no encontrado
 *       500:
 *         description: Error al actualizar el animal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar el animal"
 */

/**
 * @swagger
 * /animals:
 *   post:
 *     tags:
 *       - Animals
 *     summary: Crear un nuevo animal
 *     description: Esta ruta permite registrar un nuevo animal en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del animal
 *               age:
 *                 type: integer
 *                 description: Edad del animal
 *               species:
 *                 type: string
 *                 description: Especie del animal
 *               breed:
 *                 type: string
 *                 description: Raza del animal
 *               health_status:
 *                 type: string
 *                 description: Estado de salud del animal
 *               description:
 *                 type: string
 *                 description: Descripción del animal
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: URL de la foto del animal
 *               adoption_status:
 *                 type: string
 *                 enum:
 *                   - disponible
 *                   - en proceso
 *                   - adoptado
 *                 description: Estado de adopción del animal
 *     responses:
 *       201:
 *         description: Animal creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Animal creado correctamente"
 *       500:
 *         description: Error al crear el animal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al crear el animal"
 */
