import Usuario from '../models/userModel';

export const getUsersService = async () => {
    const users = await Usuario.find().select('-password');
    return users;
};

export const getUserByIdService = async (id: string) => {
    const user = await Usuario.findById(id).select('-password');
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user;
};

export const deleteUserByIdService = async (userId: string) => {
    return await Usuario.findByIdAndDelete(userId);
};
