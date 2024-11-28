import { NextFunction, Request, Response } from "express";
import { registerRefugee, registerUser } from "../controllers/authController";

export const roleBasedController = (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body;

    if (role === 'user') {
        return registerUser(req, res);
    } else if (role === 'refugee') {
        return registerRefugee(req, res);
    }
};