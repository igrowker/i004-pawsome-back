import { read } from 'fs';
import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    last_name: string;
    password: string;
    email: string;
    created_at?: Date;
    role: 'user' | 'refugee' | 'admin';
    isActive: boolean;
    isVolunteer: boolean;
    favorites: mongoose.Types.ObjectId[];
    photo?: string;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    last_name: {
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
    },
    favorites: { 
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Animal',
        default: []
    },
    photo: { 
        type: String,
        default: null
    }
}, {
    toJSON: {
        virtuals: true,
        transform: (_doc, ret) => {
            delete ret.id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    },
});

userSchema.virtual('refugee', {
    ref: 'Refugee',        
    localField: '_id',      
    foreignField: 'user_id', 
    justOne: true 
});

const Usuario = mongoose.model<IUser>('Usuario', userSchema);

export default Usuario;
