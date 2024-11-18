/**
 * @swagger
 * components:
 *   schemas:
 *     Animal:
 *       type: object
 *       required:
 *         - refugee_id
 *         - name
 *         - age
 *         - species
 *         - health_status
 *         - description
 *         - adoption_status
 *       properties:
 *         refugee_id:
 *           type: string
 *           description: ID del refugio o usuario asociado al animal
 *           example: "507f191e810c19729de860ea"
 *         name:
 *           type: string
 *           description: Nombre del animal
 *           example: "Rex"
 *         age:
 *           type: integer
 *           description: Edad del animal en años
 *           example: 5
 *         species:
 *           type: string
 *           description: Especie del animal (ej. perro, gato)
 *           example: "Perro"
 *         breed:
 *           type: string
 *           description: Raza del animal (opcional)
 *           example: "Pastor Alemán"
 *         health_status:
 *           type: string
 *           description: Estado de salud del animal
 *           example: "Saludable"
 *         description:
 *           type: string
 *           description: Descripción adicional del animal
 *           example: "Animal muy amigable y juguetón."
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *           description: Array de URLs de fotos del animal
 *           example:
 *             - "https://example.com/photo1.jpg"
 *             - "https://example.com/photo2.png"
 *         adoption_status:
 *           type: string
 *           description: Estado de adopción del animal
 *           enum:
 *             - "disponible"
 *             - "en proceso"
 *             - "adoptado"
 *           default: "disponible"
 *           example: "disponible"
 *       example:
 *         refugee_id: "507f191e810c19729de860ea"
 *         name: "Rex"
 *         age: 5
 *         species: "Perro"
 *         breed: "Pastor Alemán"
 *         health_status: "Saludable"
 *         description: "Animal muy amigable y juguetón."
 *         photos:
 *           - "https://example.com/photo1.jpg"
 *           - "https://example.com/photo2.png"
 *         adoption_status: "disponible"
 */
