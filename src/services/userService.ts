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
    const existingUser = await Usuario.findOne({ email: updateData.email });

    if (existingUser && existingUser.id.toString() !== id) {
      throw new Error('El email ingresado ya está en uso por otro usuario.');
    }

    const updatedUser = await Usuario.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
        throw new Error('Usuario no encontrado');
    }

    return updatedUser;
};