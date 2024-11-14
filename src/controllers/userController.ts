import { Request, Response } from 'express';
import Usuario from '../models/userModel';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }

        if (user.password !== password) {
            res.status(400).json({ message: 'Contraseña incorrecta' });
            return;
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};
// PENDIENTE AGREGAR SEGURIDAD AL PASSOWRD (HASH)

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, password, email, role } = req.body;

    try {
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'El email ya existe' });
            return;
        }

        const newUser = new Usuario({
            name,
            password,
            email,
            role
        });

        const savedUser = await newUser.save();

        res.status(201).json({ message: 'Usuario registrado', user: savedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
};
