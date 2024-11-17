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
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           example: usuario@ejemplo.com
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 *         role:
 *           type: string
 *           description: Rol del usuario (paciente o profesional)
 *           enum:
 *             - paciente
 *             - profesional
 *           default: paciente
 *       example:
 *         name: Juan Pérez
 *         password: "contraseña123"
 *         email: juanperez@ejemplo.com
 *         created_at: "2024-11-17T12:34:56.789Z"
 *         role: paciente
 */
