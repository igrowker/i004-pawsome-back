import mongoose, { Document, Schema, Types } from 'mongoose';

interface IAdoptionRequest extends Document {
    animal_id: Types.ObjectId;
    adopter_id: Types.ObjectId;
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
    request_date: {
        type: String,
        default: new Date
    },
    status: {
        type: String,
        required: true,
        enum: ['en revisión', 'en aceptada', 'rechazada'],
        default: 'en revisión'
    },
    
});

const AdoptionRequests = mongoose.model<IAdoptionRequest>('AdoptionRequests', adoptionRequest);

export default AdoptionRequests;