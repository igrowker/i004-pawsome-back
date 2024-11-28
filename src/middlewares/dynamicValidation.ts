import { NextFunction, Request, Response } from "express";
import { registerRefugeeValidationRules, registerUserValidationRules } from "../validations/authValidations";

export const dynamicValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body;

    if (role === 'user') {
        return Promise.all(registerUserValidationRules.map(rule => rule.run(req)))
            .then(() => next())
            .catch(next);
    } else if (role === 'refugee') {
        return Promise.all(registerRefugeeValidationRules.map(rule => rule.run(req)))
            .then(() => next())
            .catch(next);
    } else {
        return res.status(400).json({ message: 'Role inválido. Debe ser "user" o "refugee".' });
    }
};
