import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    created_at?: Date;
    role: 'user' | 'refugee' | 'admin';
    isActive: boolean;
    isVolunteer: boolean;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email inválido']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'refugee', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isVolunteer: {
        type: Boolean,
        default: false
    }
});


const Usuario = mongoose.model<IUser>('Usuario', userSchema);

export default Usuario;
