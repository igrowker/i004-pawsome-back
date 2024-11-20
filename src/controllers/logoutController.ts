import { Request, Response } from 'express';

export const logoutUser = async (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Logout exitoso' });
};
