import { body } from 'express-validator';

export const registerValidationRules = [
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
