import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { findUserByEmail, createUserService, forgotPasswordService, verifyToken, updatePassword } from '../services/authService';

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

export const logoutUser = async (_req: Request, res: Response) => {
    res.status(200).json({ message: 'Logout exitoso' });
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const userEmail = req.body.email
        const token = await forgotPasswordService(userEmail);
        return res.status(200).json({ message: "Token generado", token });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    const { token, newPassword } = req.body;

    try {
        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token y nueva contraseña son requeridos." });
        }

        const payload = verifyToken(token);

        if (!payload) {
            return res.status(401).json({ message: "Token inválido o expirado." });
        }
    
        await updatePassword(payload.sub, newPassword);

        return res.status(200).json({ message: "Contraseña actualizada exitosamente." });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar la contraseña.", error: (error as Error).message });
    }
};