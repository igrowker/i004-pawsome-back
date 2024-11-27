import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

// Configuración de almacenamiento de Multer con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: (req: any, file:any) => `uploads/${file.originalname}`,  // Puedes cambiar esto por el nombre de la carpeta donde se guardarán las imágenes en Cloudinary
    resource_type: 'auto', // Tipo de recurso (auto detecta el tipo de archivo)
    allowed_formats: ['jpg', 'jpeg', 'png'] // Formatos permitidos
  }as any,
});

// Crear el middleware de Multer
const upload = multer({ storage });

export default upload;
