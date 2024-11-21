import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/userModel';

const SALT_ROUNDS = 10;

export const findUserByEmail = async (email: string) => {
    const user = await Usuario.findOne({ email });
    if (!user) {
        throw new Error('Correo electrónico no registrado.');
    }
    return user;
};

export const createUserService = async (userData: { name: string; password: string; email: string; role: string }) => {
    const existingUser = await Usuario.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('El email ya existe');
    }

    const allowedRoles = ['user', 'refugee'];
    if (!allowedRoles.includes(userData.role)) {
        throw new Error('El rol proporcionado no es válido para el registro');
    }

    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
    userData.password = hashedPassword;

    const newUser = new Usuario(userData);
    const savedUser = await newUser.save();
    return savedUser;
};

export const forgotPasswordService = async (userEmail:string) => {
    const userExist = await findUserByEmail(userEmail);

    const payload = { sub: userExist.id, email: userExist.email };
    const { forgotPasswordToken } = generateForgotPasswordToken(payload);
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${forgotPasswordToken}`;

/*  await this.mailservice.cambioPasswordMail(
        userExist.email,
        userExist.name,
        resetUrl
    ); 
*/
    
    return forgotPasswordToken
  }

const generateForgotPasswordToken = (payload:any) => {
    const forgotPasswordToken = jwt.sign(
      payload, 
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '1h' }
    );
    return {
      forgotPasswordToken,
    };
  }

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");
        return decoded as { sub: string; email: string; };
    } catch (error) {
        console.error("Error verificando token:", error);
        return null;
    }
};

export const updatePassword = async (userId: string, newPassword: string): Promise<void> => {
    const user = await Usuario.findById(userId)

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await Usuario.findByIdAndUpdate(userId, {password: hashedPassword}, { new: true })

/*  await this.mailservice.ConfirmCambiodePassword(
      updatedUser.email,
      updatedUser.name,
      updatedUser.password,
    ); 
*/
};