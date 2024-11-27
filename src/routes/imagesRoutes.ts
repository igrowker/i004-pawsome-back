import { Router } from 'express';
import upload from '../middlewares/upload';
import { uploadImage } from '../controllers/imageController';

const router = Router();

// Ruta para subir una imagen
router.post('/upload', upload.single('image'), uploadImage);

export default router;
