import bcrypt from 'bcrypt';
import Usuario from '../models/userModel';

const SALT_ROUNDS = 10;

export const findUserByEmail = async (email: string) => {
    const user = await Usuario.findOne({ email });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user;
};

export const createUserService = async (userData: { name: string; password: string; email: string; role: string }) => {
    const existingUser = await Usuario.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('El email ya existe');
    }

    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
    userData.password = hashedPassword;

    const newUser = new Usuario(userData);
    const savedUser = await newUser.save();
    return savedUser;
};
