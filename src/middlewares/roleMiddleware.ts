import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const checkRole = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret') as { role: string };

            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Acceso denegado, rol no autorizado' });
            }

            next();
        } catch (err) {
            return res.status(403).json({ message: 'Token no válido' });
        }
    };
};

