import { param } from 'express-validator';

export const validateMongoId = (paramName: string) => {
  return param(paramName)
    .isMongoId()
    .withMessage(`El parámetro '${paramName}' debe ser un ID válido de MongoDB.`);
};