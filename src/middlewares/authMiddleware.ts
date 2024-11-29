import jwt from 'jsonwebtoken';

export const authenticateToken = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(req.headers.authorization);

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret') as {userId: string; email: string; role: string;};
        console.log("Usuario autenticado:", user);
        req.user = {id: user.userId, email: user.email, role: user.role};
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token no válido' });
    }
};

export const authenticateTokenRefugee = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string; role: string; };
        req.user = { id: user.id, email: user.email, role: user.role };

        if (req.user.role !== 'refugee') {
            return res.status(403).json({ message: 'Acceso restringido: solo refugios pueden crear animales' });
        }

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token no válido' });
    }
};