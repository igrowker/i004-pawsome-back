import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { findUserByEmail, createUserService, getUsersService, getUserByIdService } from '../services/userService';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Contraseña incorrecta' });
            return;
        }

        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email, 
                role: user.role
            },
            process.env.JWT_SECRET || 'defaultSecret',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: { email: user.email, name: user.name, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: (error as Error).message });
    }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, password, email, role } = req.body;
    try {
        const savedUser = await createUserService({ name, password, email, role });
        res.status(201).json({ message: 'Usuario registrado', user: savedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error: (error as Error).message });
    }
};

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