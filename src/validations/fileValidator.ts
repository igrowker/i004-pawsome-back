import { BadRequest } from 'http-errors';

export const validateFile = (file: Express.Multer.File): void => {
  const allowedFileTypes = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'jfif', 'svg'];
  const fileType = file.mimetype.split('/')[1];
  if (!allowedFileTypes.includes(fileType)) {
    throw new BadRequest('Tipo de archivo no válido. Archivos permitidos [jpg, jpeg, png, webp, gif, jfif, svg]');
  }

  const maxSize = 1073741824; // 1GB
  if (file.size > maxSize) {
    throw new BadRequest(
      'Tamaño de archivo excede el límite permitido de 1GB.',
    );
  }

  const minSize = 50000; // 50 KB
  if (file.size < minSize) {
    throw new BadRequest(
      'Tamaño de archivo insuficiente, seleccione un archivo mayor a 50 KB.',
    );
  }
};
