import Blacklist from '../models/blacklistModel';

export const logoutService = async (token: string) => {
    await Blacklist.create({ token });
    return { message: 'Logout exitoso' };
};
