/**
 * @swagger
 * /files/upload:
 *   post:
 *     summary: Sube un archivo a Cloudinary
 *     description: Permite cargar un archivo y lo almacena en Cloudinary. La validación del archivo se realiza antes de su carga.
 *     tags:
 *       - files
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo a cargar. Debe cumplir con las reglas de validación configuradas.
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: Archivo subido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Archivo subido exitosamente."
 *                 url:
 *                   type: string
 *                   description: URL del archivo cargado en Cloudinary.
 *                   example: "https://res.cloudinary.com/demo/image/upload/v1234567890/archivo.png"
 *       400:
 *         description: Archivo faltante o no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se ha proporcionado ningún archivo."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al subir el archivo."
 *                 error:
 *                   type: string
 *                   example: "Error específico del servidor"
 */
