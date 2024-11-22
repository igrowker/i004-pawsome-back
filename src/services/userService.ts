import Usuario from '../models/userModel';
import mongoose from 'mongoose';

export const getUsersService = async () => {
    const users = await Usuario.find().select('-password'); // Excluye el campo password
    return users;
};

export const getUserByIdService = async (id: string) => {
    const user = await Usuario.findById(id).select('-password');
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user;
};

export const updateUserService = async (id: string, updateData: any) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('ID de usuario no válido');
    }

    const updatedUser = await Usuario.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
        throw new Error('Usuario no encontrado');
    }

    return updatedUser;
};