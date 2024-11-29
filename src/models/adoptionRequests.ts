import mongoose, { Document, Schema, Types } from 'mongoose';

interface IAdoptionRequest extends Document {
    animal_id: Types.ObjectId;
    adopter_id: Types.ObjectId;
    name: string;
    details: string;
    compatibility: string;
    location: string;
    housingSituation: string;
    experience: boolean;
    request_date?: Date;
    status: string;
}

const adoptionRequest = new Schema<IAdoptionRequest>({
    animal_id: {
        type: Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    },
    adopter_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    compatibility: {
        type: String,
        required: true
    },
    request_date: {
        type: String,
        default: new Date
    },
    housingSituation: {
        type: String,
        required: true,
        enum: ['Casa', 'Departamento'],
    },
    experience: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['en revisión', 'aceptada', 'rechazada'],
        default: 'en revisión'
    },
});

const AdoptionRequests = mongoose.model<IAdoptionRequest>('AdoptionRequests', adoptionRequest);

export default AdoptionRequests;