import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    nombre: string;
    apellido: string;
    password: string;
    email: string;
}

const userSchema = new Schema<IUser>({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
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
    }
});

const Usuario = mongoose.model<IUser>('Usuario', userSchema);

export default Usuario;

/* 
    NOTA: Si se necesitan más campos en el futuro, se pueden agregar
    aquí. Ejemplo:
    
    edad: {
        type: Number,
        min: 0
    },
    altura: {
        type: Number
    }
*/
