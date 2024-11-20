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
 *     description: 
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
 *                   _id:
 *                     type: string
 *                     description: ID único del animal
 *                     example: "6739975cabab1984320cdbed"
 *                   refugee_id:
 *                     type: string
 *                     description: ID del refugio al que pertenece el animal
 *                     example: "64d0f4c2b45302e4a7d3bc35"
 *                   name:
 *                     type: string
 *                     description: Nombre del animal
 *                     example: "Luna"
 *                   age:
 *                     type: integer
 *                     description: Edad del animal en años
 *                     example: 2
 *                   species:
 *                     type: string
 *                     description: Especie del animal (e.g., Perro, Gato, Conejo)
 *                     example: "Gato"
 *                   breed:
 *                     type: string
 *                     description: Raza del animal
 *                     example: "Siamés"
 *                   health_status:
 *                     type: string
 *                     description: Estado de salud del animal
 *                     example: "Esterilizada, sin enfermedades conocidas"
 *                   description:
 *                     type: string
 *                     description: Descripción breve del animal
 *                     example: "Gata tranquila y cariñosa. Le encanta dormir junto a la ventana."
 *                   photos:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: URLs de las fotos del animal
 *                     example: ["https://example.com/images/luna1.jpg", "https://example.com/images/luna2.jpg"]
 *                   adoption_status:
 *                     type: string
 *                     description: Estado de adopción del animal
 *                     enum:
 *                       - disponible
 *                       - en proceso
 *                       - adoptado
 *                     example: "en proceso"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación del registro del animal
 *                     example: "17/11/2024 05:05"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Última fecha de actualización del registro del animal
 *                     example: "17/11/2024 05:05"
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
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único del animal
 *                   example: "6739975cabab1984320cdbed"
 *                 refugee_id:
 *                   type: string
 *                   description: ID del refugio al que pertenece el animal
 *                   example: "64d0f4c2b45302e4a7d3bc35"
 *                 name:
 *                   type: string
 *                   description: Nombre del animal
 *                   example: "Luna"
 *                 age:
 *                   type: integer
 *                   description: Edad del animal en años
 *                   example: 2
 *                 species:
 *                   type: string
 *                   description: Especie del animal (e.g., Perro, Gato, Conejo)
 *                   example: "Gato"
 *                 breed:
 *                   type: string
 *                   description: Raza del animal
 *                   example: "Siamés"
 *                 health_status:
 *                   type: string
 *                   description: Estado de salud del animal
 *                   example: "Esterilizada, sin enfermedades conocidas"
 *                 description:
 *                   type: string
 *                   description: Descripción breve del animal
 *                   example: "Gata tranquila y cariñosa. Le encanta dormir junto a la ventana."
 *                 photos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: URLs de las fotos del animal
 *                   example: ["https://example.com/images/luna1.jpg", "https://example.com/images/luna2.jpg"]
 *                 adoption_status:
 *                   type: string
 *                   description: Estado de adopción del animal
 *                   enum:
 *                     - disponible
 *                     - en proceso
 *                     - adoptado
 *                   example: "en proceso"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación del registro del animal
 *                   example: "2024-11-16T09:00:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Última fecha de actualización del registro del animal
 *                   example: "2024-11-16T09:00:00.000Z"
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del animal
 *               age:
 *                 type: integer
 *                 description: Edad del animal en años
 *               species:
 *                 type: string
 *                 description: Especie del animal (e.g., Perro, Gato, Conejo)
 *               breed:
 *                 type: string
 *                 description: Raza del animal
 *               health_status:
 *                 type: string
 *                 description: Estado de salud del animal
 *               description:
 *                 type: string
 *                 description: Descripción breve del animal
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs de las fotos del animal
 *               adoption_status:
 *                 type: string
 *                 description: Estado de adopción del animal
 *                 enum:
 *                   - disponible
 *                   - en proceso
 *                   - adoptado
 *     responses:
 *       200:
 *         description: Animal actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único del animal
 *                   example: "6739975cabab1984320cdbed"
 *                 refugee_id:
 *                   type: string
 *                   description: ID del refugio al que pertenece el animal
 *                   example: "64d0f4c2b45302e4a7d3bc35"
 *                 name:
 *                   type: string
 *                   description: Nombre del animal
 *                   example: "Luna"
 *                 age:
 *                   type: integer
 *                   description: Edad del animal en años
 *                   example: 2
 *                 species:
 *                   type: string
 *                   description: Especie del animal (e.g., Perro, Gato, Conejo)
 *                   example: "Gato"
 *                 breed:
 *                   type: string
 *                   description: Raza del animal
 *                   example: "Siamés"
 *                 health_status:
 *                   type: string
 *                   description: Estado de salud del animal
 *                   example: "Esterilizada, sin enfermedades conocidas"
 *                 description:
 *                   type: string
 *                   description: Descripción breve del animal
 *                   example: "Gata tranquila y cariñosa. Le encanta dormir junto a la ventana."
 *                 photos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: URLs de las fotos del animal
 *                   example: ["https://example.com/images/luna1.jpg", "https://example.com/images/luna2.jpg"]
 *                 adoption_status:
 *                   type: string
 *                   description: Estado de adopción del animal
 *                   enum:
 *                     - disponible
 *                     - en proceso
 *                     - adoptado
 *                   example: "en proceso"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación del registro del animal
 *                   example: "2024-11-16T09:00:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Última fecha de actualización del registro del animal
 *                   example: "2024-11-16T10:00:00.000Z"
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
 *             type: object
 *             properties:
 *               refugee_id:
 *                 type: string
 *                 description: ID del refugio al que pertenece el animal
 *                 example: "64d0f4c2b45302e4a7d3bc35"
 *               name:
 *                 type: string
 *                 description: Nombre del animal
 *                 example: "Luna"
 *               age:
 *                 type: integer
 *                 description: Edad del animal en años
 *                 example: 2
 *               species:
 *                 type: string
 *                 description: Especie del animal (e.g., Perro, Gato, Conejo)
 *                 example: "Gato"
 *               breed:
 *                 type: string
 *                 description: Raza del animal
 *                 example: "Siamés"
 *               health_status:
 *                 type: string
 *                 description: Estado de salud del animal
 *                 example: "Esterilizada, sin enfermedades conocidas"
 *               description:
 *                 type: string
 *                 description: Descripción breve del animal
 *                 example: "Gata tranquila y cariñosa. Le encanta dormir junto a la ventana."
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs de las fotos del animal
 *                 example: ["https://example.com/images/luna1.jpg", "https://example.com/images/luna2.jpg"]
 *               adoption_status:
 *                 type: string
 *                 description: Estado de adopción del animal
 *                 enum:
 *                   - disponible
 *                   - en proceso
 *                   - adoptado
 *                 example: "en proceso"
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
 *                   description: Mensaje de confirmación de la creación del animal
 *                   example: "Animal creado con éxito"
 *                 animal:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID único del animal
 *                       example: "6739975cabab1984320cdbed"
 *                     refugee_id:
 *                       type: string
 *                       description: ID del refugio al que pertenece el animal
 *                       example: "64d0f4c2b45302e4a7d3bc35"
 *                     name:
 *                       type: string
 *                       description: Nombre del animal
 *                       example: "Luna"
 *                     age:
 *                       type: integer
 *                       description: Edad del animal en años
 *                       example: 2
 *                     species:
 *                       type: string
 *                       description: Especie del animal (e.g., Perro, Gato, Conejo)
 *                       example: "Gato"
 *                     breed:
 *                       type: string
 *                       description: Raza del animal
 *                       example: "Siamés"
 *                     health_status:
 *                       type: string
 *                       description: Estado de salud del animal
 *                       example: "Esterilizada, sin enfermedades conocidas"
 *                     description:
 *                       type: string
 *                       description: Descripción breve del animal
 *                       example: "Gata tranquila y cariñosa. Le encanta dormir junto a la ventana."
 *                     photos:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: URLs de las fotos del animal
 *                       example: ["https://example.com/images/luna1.jpg", "https://example.com/images/luna2.jpg"]
 *                     adoption_status:
 *                       type: string
 *                       description: Estado de adopción del animal
 *                       enum:
 *                         - disponible
 *                         - en proceso
 *                         - adoptado
 *                       example: "en proceso"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de creación del registro del animal
 *                       example: "2024-11-16T09:00:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Última fecha de actualización del registro del animal
 *                       example: "2024-11-16T09:00:00.000Z"
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