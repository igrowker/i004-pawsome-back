/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *         - role
 *         - isActive
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del usuario
 *           example: "673cdedbe27d2bc143950052"
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
 *           description: Rol del usuario (usuario, refugiado, administrador)
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
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 *           example: "2024-11-19T18:54:19.832Z"
 *       example:
 *         _id: "673cdedbe27d2bc143950052"
 *         name: Juan Pérez
 *         password: "$2b$10$OcZI0daaMLtPgQm/uQLxWukhwlL4t/BNGxHJR9t32.8u6F5eWN5uO"
 *         email: juan.perez@example.com
 *         role: user
 *         isActive: true
 *         isVolunteer: false
 *         created_at: "2024-11-19T18:54:19.832Z"
 *       description: Información sobre la entidad Usuario.
 * 
 *     UserDto:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: |
 *             Nombre del usuario.
 *             - Longitud mínima: 3 caracteres.
 *             - Longitud máxima: 50 caracteres.
 *           minLength: 3
 *           maxLength: 50
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           description: Correo electrónico válido del usuario.
 *           format: email
 *           example: juan.perez@example.com
 *         password:
 *           type: string
 *           description: |
 *             Contraseña del usuario.
 *             - Debe contener al menos:
 *               - Una letra minúscula.
 *               - Una letra mayúscula.
 *               - Un número.
 *               - Un carácter especial (!@#$%^&.*).
 *             - Longitud mínima: 8 caracteres.
 *             - Longitud máxima: 50 caracteres.
 *           minLength: 8
 *           maxLength: 50
 *           pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&.*]).+$"
 *           example: MiContraseñaSegura123!
 *         role:
 *           type: string
 *           description: |
 *             Rol asignado al usuario. Puede ser:
 *           enum: 
 *             - user
 *             - refugee
 *             - admin
 *           default: user
 *           example: user
 *       description: Información sobre campos para registrar un Usuario.
 * 
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           example: "juan.perez@example.com"
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: "MiContraseñaSegura123!"
 *       description: Información para el login del usuario.
 */