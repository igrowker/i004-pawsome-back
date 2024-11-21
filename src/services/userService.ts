import Usuario from '../models/userModel';

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