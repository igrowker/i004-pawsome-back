import { Request, Response } from 'express';
import { getUsersService, getUserByIdService } from '../services/userService';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await getUsersService();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los usuarios', error: (error as Error).message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await getUserByIdService(id);
        return res.status(200).json(user);
    } catch (error: unknown) {
        if ((error as Error).message === 'Usuario no encontrado') {
            return res.status(404).json({ message: (error as Error).message });
        }
        return res.status(500).json({ message: 'Error al obtener el usuario', error: (error as Error).message });
    }
};