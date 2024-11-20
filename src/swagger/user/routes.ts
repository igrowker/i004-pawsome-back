/**
 * @swagger
 * tags:
 *   - name: user
 *     description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     description: Autentica a un usuario en el sistema con el correo electrónico y la contraseña proporcionados.
 *     operationId: loginUser
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "juan.perez@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "miContraseñaSegura123!"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión exitoso"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID único del usuario
 *                       example: "673cdedbe27d2bc143950052"
 *                     name:
 *                       type: string
 *                       description: Nombre completo del usuario
 *                       example: "Juan Pérez"
 *                     password:
 *                       type: string
 *                       description: Contraseña del usuario (encriptada)
 *                       example: "$2b$10$OcZI0daaMLtPgQm/uQLxWukhwlL4t/BNGxHJR9t32.8u6F5eWN5uO"
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del usuario
 *                       example: "juan.perez@example.com"
 *                     role:
 *                       type: string
 *                       description: Rol asignado al usuario
 *                       example: "user"
 *                     isActive:
 *                       type: boolean
 *                       description: Estado de actividad del usuario
 *                       example: true
 *                     isVolunteer:
 *                       type: boolean
 *                       description: Estado de voluntariado del usuario
 *                       example: false
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de creación del usuario
 *                       example: "2024-11-19T18:54:19.832Z"
 *                     __v:
 *                       type: integer
 *                       description: Versión del documento en la base de datos
 *                       example: 0
 *       400:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña incorrecta"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al iniciar sesión"
 *                 error:
 *                   type: string
 *                   example: "Error específico del servidor"
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema con los datos proporcionados.
 *     operationId: registerUser
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - email
 *               - role
 *               - isActive
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre completo del usuario
 *                 example: "Juan Pérez"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario. Debe ser segura.
 *                 example: "miContraseñaSegura123!"
 *               email:
 *                 type: string
 *                 description: Correo electrónico único del usuario
 *                 example: "juan.perez@example.com"
 *               role:
 *                 type: string
 *                 description: Rol asignado al usuario. Puede ser 'user', 'refugee' o 'admin'.
 *                 enum:
 *                   - user
 *                   - refugee
 *                   - admin
 *                 example: "user"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID único del usuario
 *                       example: "673cdedbe27d2bc143950052"
 *                     name:
 *                       type: string
 *                       description: Nombre completo del usuario
 *                       example: "Juan Pérez"
 *                     password:
 *                       type: string
 *                       description: Contraseña cifrada del usuario
 *                       example: "$2b$10$OcZI0daaMLtPgQm/uQLxWukhwlL4t/BNGxHJR9t32.8u6F5eWN5uO"
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del usuario
 *                       example: "juan.perez@example.com"
 *                     role:
 *                       type: string
 *                       description: Rol asignado al usuario
 *                       example: "user"
 *                     isActive:
 *                       type: boolean
 *                       description: Estado de actividad del usuario
 *                       example: true
 *                     isVolunteer:
 *                       type: boolean
 *                       description: Estado de voluntariado del usuario
 *                       example: false
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de creación del usuario
 *                       example: "2024-11-19T18:54:19.832Z"
 *                     __v:
 *                       type: integer
 *                       description: Versión del documento en la base de datos
 *                       example: 0
 *       400:
 *         description: Solicitud mal formada o con datos faltantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Faltan campos obligatorios"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al registrar el usuario"
 *                 error:
 *                   type: string
 *                   example: "Error específico del servidor"
 */