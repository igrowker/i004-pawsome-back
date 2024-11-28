import { body } from 'express-validator';

export const registerUserValidationRules = [
  body('name')
    .isString().withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.')
    .matches(/^[a-zA-Z\s]*$/).withMessage(
        'El nombre solo puede contener letras y espacios'
    ),
  body('last_name')
    .isString().withMessage('El apellido debe ser una cadena de texto.')
    .isLength({ min: 3, max: 50 }).withMessage('El apellido debe tener entre 3 y 50 caracteres.')
    .matches(/^[a-zA-Z\s]*$/).withMessage(
        'El apellido solo puede contener letras y espacios'
    ),
  body('email')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido.'),
  body('password')
    .isLength({ min: 8, max: 50 }).withMessage('La contraseña debe tener entre 8 y 50 caracteres.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*]).+$/).withMessage(
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&.*).'
    ),
  body('role')
    .optional()
    .isIn(['user', 'refugee', 'admin']).withMessage('El rol debe ser uno de los siguientes: user, refugee, admin.')
];

export const registerRefugeeValidationRules = [
  body('name')
    .isString().withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.')
    .matches(/^[a-zA-Z\s]*$/).withMessage(
        'El nombre solo puede contener letras y espacios'
    ),
  
  body('last_name')
    .isString().withMessage('El apellido debe ser una cadena de texto.')
    .isLength({ min: 3, max: 50 }).withMessage('El apellido debe tener entre 3 y 50 caracteres.')
    .matches(/^[a-zA-Z\s]*$/).withMessage(
        'El apellido solo puede contener letras y espacios'
    ),
  
  body('email')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido.'),
  
  body('password')
    .isLength({ min: 8, max: 50 }).withMessage('La contraseña debe tener entre 8 y 50 caracteres.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*]).+$/).withMessage(
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&.*).'
    ),
  
  body('name_refugee')
    .isString().withMessage('El nombre del refugio debe ser una cadena de texto.')
    .isLength({ min: 3, max: 100 }).withMessage('El nombre del refugio debe tener entre 3 y 100 caracteres.'),

  body('description')
    .isString().withMessage('La descripción debe ser una cadena de texto.')
    .isLength({ min: 10, max: 500 }).withMessage('La descripción debe tener entre 10 y 500 caracteres.'),

  body('img')
    .optional()
    .isString().withMessage('La URL de la imagen debe ser una cadena de texto.')
    .isURL().withMessage('Debe proporcionar una URL válida para la imagen.'),
];

export const loginValidationRules = [
  body('email')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido.'),
  body('password')
    .isLength({ min: 8, max: 50 }).withMessage('La contraseña debe tener entre 8 y 50 caracteres.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*]).+$/).withMessage(
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&.*).'
    )
];

export const forgotPassValidationRules = [
  body('email')
    .isEmail().withMessage('Debe proporcionar un correo electrónico válido.'),
];

export const resetPassValidationRules = [
  body('token')
    .isString().withMessage('El token debe ser una cadena de texto.')
    .matches(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/).withMessage(
      'El token no tiene un formato JWT válido.'
    ),
  body('newPassword')
    .isLength({ min: 8, max: 50 }).withMessage('La contraseña debe tener entre 8 y 50 caracteres.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*]).+$/).withMessage(
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&.*).'
    )
];
