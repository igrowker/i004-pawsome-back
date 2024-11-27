import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Usa la configuración centralizada
  params: {
    folder: "uploads", // Carpeta en Cloudinary
    allowed_formats: ["jpeg", "png", "jpg"], // Formatos permitidos
  } as Record<string, unknown>,
});

export default storage;
