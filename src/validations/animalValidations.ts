import { body } from 'express-validator';

export const createAnimalValidationRules = [
  body('refugee_id')
    .isString().withMessage('El ID del refugio debe ser una cadena de texto.')
    .matches(/^[a-fA-F0-9]{24}$/).withMessage('El ID del refugio debe ser un ObjectId válido.'),

  body('name')
    .isString().withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 2, max: 30 }).withMessage('El nombre debe tener entre 2 y 30 caracteres.')
    .matches(/^[a-zA-Z\s]*$/).withMessage(
        'El nombre solo puede contener letras y espacios'
    ),

  body('age')
    .isInt({ min: 0, max: 30 }).withMessage('La edad debe ser un número entero entre 0 y 30 años.'),

  body('species')
    .isString().withMessage('La especie debe ser una cadena de texto.')
    .isLength({ min: 3, max: 20 }).withMessage('La especie debe tener entre 3 y 20 caracteres.')
    .matches(/^[a-zA-Z\s]*$/).withMessage(
        'La especie solo puede contener letras y espacios'
    ),

  body('breed')
    .optional()
    .isString().withMessage('La raza debe ser una cadena de texto.')
    .matches(/^[a-zA-Z\s]*$/).withMessage(
        'La raza solo puede contener letras y espacios'
    ),

  body('health_status')
    .isString().withMessage('El estado de salud debe ser una cadena de texto.')
    .isIn(['sano', 'enfermo', 'discapacitado']).withMessage(
      'El estado de salud debe ser uno de los siguientes: sano, enfermo, discapacitado.'
    ),
    
  body('medicalHistory')
    .optional()
    .isObject().withMessage('El historial médico debe ser un objeto.')
    .custom((medicalHistory) => {
      if (medicalHistory.conditions && !Array.isArray(medicalHistory.conditions)) {
        throw new Error('Las condiciones deben ser un arreglo de cadenas.');
      }
      if (medicalHistory.conditions) {
        medicalHistory.conditions.forEach((condition: string) => {
          if (typeof condition !== 'string' || !/^[a-zA-Z\s]*$/.test(condition)) {
            throw new Error('Cada condición debe ser una cadena de texto.');
          }
        });
      }
      if (medicalHistory.vaccinations && !Array.isArray(medicalHistory.vaccinations)) {
        throw new Error('Las vacunaciones deben ser un arreglo.');
      }
      if (medicalHistory.vaccinations) {
        medicalHistory.vaccinations.forEach((vaccination: any) => {
          if (typeof vaccination !== 'object') {
            throw new Error('Cada vacunación debe ser un objeto.');
          }
          if (!vaccination.name || typeof vaccination.name !== 'string') {
            throw new Error('Cada vacunación debe tener un nombre como cadena de texto.');
          }
          if (!vaccination.date || !/^\d{4}-\d{2}-\d{2}$/.test(vaccination.date)) {
            throw new Error('Cada vacunación debe tener una fecha válida en formato YYYY-MM-DD.');
          }
        });
      }
      return true;
    }),

  body('description')
    .isString().withMessage('La descripción debe ser una cadena de texto.')
    .isLength({ min: 10, max: 200 }).withMessage('La descripción debe tener entre 10 y 200 caracteres.'),

  body('photos')
    .optional()
    .isArray({ max: 5 }).withMessage('La lista de fotos puede contener como máximo 5 URLs.')
    .custom((photos) => photos.every((photo: string) => /^https?:\/\/.+/.test(photo)))
    .withMessage('Cada foto debe ser una URL válida.'),

  body('adoption_status')
    .isString().withMessage('El estado de adopción debe ser una cadena de texto.')
    .isIn(['disponible', 'en proceso', 'adoptado']).withMessage(
      'El estado de adopción debe ser uno de los siguientes: disponible, en proceso, adoptado.'
    ),
];

export const updateAnimalValidationRules = [
  body('refugee_id')
    .isEmpty().withMessage('No esta permitido modificar el refugio al que pertenece el animal'),
  
  body('name')
    .optional()
    .isString().withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 2, max: 30 }).withMessage('El nombre debe tener entre 2 y 30 caracteres.')
    .matches(/^[a-zA-Z\s]*$/).withMessage(
        'El nombre solo puede contener letras y espacios'
    ),

  body('age')
    .optional()
    .isInt({ min: 0, max: 30 }).withMessage('La edad debe ser un número entero entre 0 y 30 años.'),

  body('species')
    .isEmpty().withMessage('No esta permitido modificar la especie del animal'),

  body('breed')
    .optional()
    .isString().withMessage('La raza debe ser una cadena de texto.')
    .matches(/^[a-zA-Z\s]*$/).withMessage(
        'La raza solo puede contener letras y espacios'
    ),

  body('health_status')
    .optional()
    .isString().withMessage('El estado de salud debe ser una cadena de texto.')
    .isLength({ min: 10, max: 100 }).withMessage('El estado de salud debe tener entre 10 y 100 caracteres.')
    .matches(/^[a-zA-Z\s]*$/).withMessage(
        'El estado de salud solo puede contener letras y espacios'
    ),
    
  body('description')
    .optional()
    .isString().withMessage('La descripción debe ser una cadena de texto.')
    .isLength({ min: 10, max: 200 }).withMessage('La descripción debe tener entre 10 y 200 caracteres.'),

  body('photos')
    .optional()
    .isArray({ max: 5 }).withMessage('La lista de fotos puede contener como máximo 5 URLs.')
    .custom((photos) => photos.every((photo: string) => /^https?:\/\/.+/.test(photo)))
    .withMessage('Cada foto debe ser una URL válida.'),
  
  body('adoption_status')
    .optional()
    .isString().withMessage('El estado de adopción debe ser una cadena de texto.')
    .isIn(['disponible', 'en proceso', 'adoptado']).withMessage(
      'El estado de adopción debe ser uno de los siguientes: disponible, en proceso, adoptado.'
    ),
];