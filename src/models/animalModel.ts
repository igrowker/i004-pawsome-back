import mongoose, { Document, Schema, Types } from 'mongoose';

interface IAnimal extends Document {
    refugee_id: Types.ObjectId;
    name: string;
    age: number;
    species: string;
    breed?: string;
    health_status: string;
    description: string;
    photos: string[];
    adoption_status: 'disponible' | 'en proceso' | 'adoptado';
}

const animalSchema = new Schema<IAnimal>({
    refugee_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    species: {
        type: String,
        required: true,
        trim: true
    },
    breed: {
        type: String,
        trim: true
    },
    health_status: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    photos: {
        type: [String],
        validate: {
            validator: (arr: string[]) => arr.every(url => /^https?:\/\/.*\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)),
            message: 'Cada URL de foto debe ser válida y de tipo imagen.'
        }
    },
    adoption_status: {
        type: String,
        required: true,
        enum: ['disponible', 'en proceso', 'adoptado'],
        default: 'disponible'
    }
}, {
    timestamps: true
});

const Animal = mongoose.model<IAnimal>('Animal', animalSchema);

export default Animal;
