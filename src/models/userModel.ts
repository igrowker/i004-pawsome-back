import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    created_at?: Date;
    role: 'paciente' | 'profesional';
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
        enum: ['paciente', 'profesional'],
        default: 'paciente'
    }
});

const Usuario = mongoose.model<IUser>('Usuario', userSchema);

export default Usuario;
