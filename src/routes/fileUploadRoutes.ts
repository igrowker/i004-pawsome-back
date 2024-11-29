import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/fileUploadController';

const upload = multer();

const fileUploadRoutes = express.Router();

fileUploadRoutes.post('/upload', upload.single('file'), uploadFile);

export default fileUploadRoutes;