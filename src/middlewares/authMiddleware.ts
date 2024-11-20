import jwt from 'jsonwebtoken';

export const authenticateToken = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token no válido' });
    }
};
