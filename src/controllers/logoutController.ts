import { Request, Response } from 'express';
import { logoutService } from '../services/logoutService';

export const logoutUser = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'Token no proporcionado' });
    }

    try {
        const result = await logoutService(token);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error al cerrar sesión', error: (error as Error).message });
    }
};
