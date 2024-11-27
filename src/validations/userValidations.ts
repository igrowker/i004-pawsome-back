import { body } from 'express-validator';

export const updateUserValidationRules = [
    body('name')
      .optional()
      .isString().withMessage('El nombre debe ser una cadena de texto.')
      .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.')
      .matches(/^[a-zA-Z\s]*$/).withMessage(
          'El nombre solo puede contener letras y espacios'
      ),
    body('email')
      .optional()
      .isEmail().withMessage('Debe proporcionar un correo electrónico válido.'),
    body('password')
      .optional()
      .isLength({ min: 8, max: 50 }).withMessage('La contraseña debe tener entre 8 y 50 caracteres.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*]).+$/).withMessage(
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&.*).'
      ),
    body('role')
      .isEmpty().withMessage('No tienes permitido modificar el rol')
  ];