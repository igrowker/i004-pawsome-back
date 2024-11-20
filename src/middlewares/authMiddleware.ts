import jwt from 'jsonwebtoken';
import Blacklist from '../models/blacklistModel';

export const authenticateToken = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token inválido, inicia sesión nuevamente' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token no válido' });
    }
};
