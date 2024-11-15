import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { findUserByEmail, createUserService } from '../services/userService';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Contraseña incorrecta' });
            return;
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
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
