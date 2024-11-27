import { Request, Response } from "express";

export const uploadImage = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Validar que se haya proporcionado un archivo
    if (!req.file) {
      return res.status(400).json({ message: "No se ha proporcionado una imagen" });
    }

    // Obtener información del archivo subido a través de Multer
    const file = req.file as any; // `as any` solo si TypeScript da problemas

    return res.status(200).json({
      message: "Imagen subida exitosamente",
      imageUrl: file.path, // URL pública de Cloudinary
      cloudinaryId: file.filename, // ID único en Cloudinary
      folder: "uploads", // Carpeta en Cloudinary
    });
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return res.status(500).json({ message: "Error interno del servidor al subir la imagen" });
  }
};
