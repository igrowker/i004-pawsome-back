import Usuario from '../models/userModel';
import Animal from '../models/animalModel';

export const getUsersService = async () => {
    const users = await Usuario.find().populate('refugee');
    return users;
};

export const getUserByIdService = async (id: string) => {
    const user = await Usuario.findById(id).populate('refugee');
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user;
};

export const deleteUserByIdService = async (userId: string) => {
    return await Usuario.findByIdAndDelete(userId);
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

export const addFavoriteService = async (userId: string, animalId: string) => {
    const animalObjectId = Animal.toObjectId(animalId);

    const user = await Usuario.findByIdAndUpdate(
        userId,
        { $addToSet: { favorites: animalObjectId } },
        { new: true }
    ).populate('favorites');

    if (user) {
        return user;
    } else {
        throw new Error('Usuario no encontrado');
    }
};

export const removeFavoriteService = async (userId: string, animalId: string) => {
    const user = await Usuario.findById(userId);

    if (user) {
        user.favorites = user.favorites.filter(favId => favId.toString() !== animalId);
        await user.save();
        return user;
    } else {
        throw new Error('Usuario no encontrado');
    }
};

export const getFavoritesService = async (userId: string) => {
    const user = await Usuario.findById(userId).populate('favorites');

    if (user) {
        return user.favorites;
    } else {
        throw new Error('Usuario no encontrado');
    }
};
