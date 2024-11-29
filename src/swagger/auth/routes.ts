/**
 * @swagger
 * tags:
 *   - name: auth
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión en el sistema
 *     description: Obtén un token de acceso proporcionando las credenciales.
 *     security: [] # No requiere autenticación
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
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
 *                   $ref: '#/components/schemas/User'
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
 *     security: [] # No requiere autenticación
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDto'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Usuario registrado exitosamente"
 *                     user_id:
 *                       type: string
 *                       example: "6748e6fc2d23d3397bc24d0e" 
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Usuario y su refugio registrados correctamente"
 *                     user_id:
 *                       type: string
 *                       example: "6748e6fc2d23d3397bc24d0e" 
 *                     refugee_id:
 *                       type: string
 *                       example: "67477fb91758a228842bb1ef" 
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
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Error al registrar el usuario"
 *                     error:
 *                       type: string
 *                       example: "Error específico del servidor" 
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Error al registrar el usuario y su refugio"
 *                     error:
 *                       type: string
 *                       example: "Error específico del servidor" 
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cierra la sesión de un usuario
 *     description: Finaliza la sesión del usuario autenticado.
 *     tags:
 *       - auth
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sesión cerrada exitosamente"
 *       403:
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Acceso no autorizado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al cerrar sesión"
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicitar un enlace para restablecer la contraseña
 *     description: Genera un token de recuperación y lo envía al correo electrónico del usuario para restablecer la contraseña.
 *     security: [] # No requiere autenticación
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario que solicita el restablecimiento de contraseña.
 *                 example: "usuario@ejemplo.com"
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Token generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token generado"
 *                 token:
 *                   type: string
 *                   description: Token de recuperación para restablecer la contraseña.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1N2MwNzNiMi0wNzE3LTRkNmYtYjZkYS0zNmVjNzEwMzg4N2IiLCJlbWFpbCI6InVzZXJpb0BlamVtcGxvLmNvbSIsImlhdCI6MTYwMjMwMzE3MCwiZXhwIjoxNjAyMzAzMTcwfQ.eYjQhbqNVqJwrtmjlqR8oKZRdTL27q5MzYzA5erlsBs"
 *       400:
 *         description: Correo electrónico no proporcionado o incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Correo electrónico no encontrado"
 *       500:
 *         description: Error al generar el token de recuperación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al generar el token"
 *                 error:
 *                   type: string
 *                   example: "Error específico del servidor"
 */

/**
 * @swagger
 * /auth/reset-password:
 *   put:
 *     summary: Restablecer la contraseña del usuario
 *     description: Verifica el token de recuperación y actualiza la contraseña del usuario.
 *     security: [] # No requiere autenticación
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de recuperación enviado al correo del usuario.
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1N2MwNzNiMi0wNzE3LTRkNmYtYjZkYS0zNmVjNzEwMzg4N2IiLCJlbWFpbCI6InVzZXJpb0BlamVtcGxvLmNvbSIsImlhdCI6MTYwMjMwMzE3MCwiZXhwIjoxNjAyMzAzMTcwfQ.eYjQhbqNVqJwrtmjlqR8oKZRdTL27q5MzYzA5erlsBs"
 *               newPassword:
 *                 type: string
 *                 description: La nueva contraseña que el usuario desea establecer.
 *                 example: "NuevaContraseña123!"
 *             required:
 *               - token
 *               - newPassword
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña actualizada exitosamente"
 *       400:
 *         description: Token o nueva contraseña no proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token y nueva contraseña son requeridos."
 *       401:
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido o expirado."
 *       500:
 *         description: Error al actualizar la contraseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar la contraseña"
 *                 error:
 *                   type: string
 *                   example: "Error específico del servidor"
 */
