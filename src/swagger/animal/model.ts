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
 *           description: El ID del refugio al que pertenece el animal
 *           example: "64d0f4c2b45302e4a7d3bc35"
 *         name:
 *           type: string
 *           description: El nombre del animal
 *           example: "Luna"
 *         age:
 *           type: integer
 *           description: La edad del animal en años
 *           example: 3
 *         species:
 *           type: string
 *           description: La especie del animal (e.g., Perro, Gato, Conejo)
 *           example: "Gato"
 *         breed:
 *           type: string
 *           description: La raza del animal (opcional)
 *           example: "Siamés"
 *         health_status:
 *           type: string
 *           description: El estado de salud del animal
 *           example: "Esterilizado, sin enfermedades conocidas"
 *         description:
 *           type: string
 *           description: Descripción breve sobre el animal
 *           example: "Gata tranquila y cariñosa que disfruta de los rayos del sol."
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de URLs de fotos del animal
 *           example: ["https://example.com/images/luna1.jpg", "https://example.com/images/luna2.jpg"]
 *         adoption_status:
 *           type: string
 *           description: El estado de adopción del animal
 *           enum:
 *             - disponible
 *             - en proceso
 *             - adoptado
 *           example: "en proceso"
 *       description: Información sobre campos para registrar un Animal.
 */
