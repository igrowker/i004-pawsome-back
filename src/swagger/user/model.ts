/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *         - role
 *         - isActive
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *           example: Juan Pérez
 *         password:
 *           type: string
 *           description: Contraseña del usuario, encriptada al almacenarse
 *           example: contraseñaSegura123
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           format: email
 *           example: juan.perez@example.com
 *         role:
 *           type: string
 *           description: Rol del usuario (usuario, refugio, administrador)
 *           enum:
 *             - user
 *             - refugee
 *             - admin
 *           default: user
 *         isActive:
 *           type: boolean
 *           description: Indica si el usuario está activo
 *           default: true
 *         isVolunteer:
 *           type: boolean
 *           description: Indica si el usuario es voluntario
 *           default: false
 *       example:
 *         name: Juan Pérez
 *         password: "$2b$10$OcZI0daaMLtPgQm/uQLxWukhwlL4t/BNGxHJR9t32.8u6F5eWN5uO"
 *         email: juan.perez@example.com
 *         created_at: "2024-11-19T18:54:19.832Z"
 *         role: user
 *         isActive: true
 *         isVolunteer: false
 *       description: Información sobre campos para registrar un Usuario.
 */