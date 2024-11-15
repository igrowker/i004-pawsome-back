import mongoose, { Document, Schema, Types } from 'mongoose';

interface IRefugeeNeed extends Document {
    refugee_id: Types.ObjectId;
    item: string;
    quantity: number;
    urgency: string;
}

const refugeeNeedSchema = new Schema<IRefugeeNeed>({
    refugee_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    urgency: {
        type: String,
        required: true
    },
});

const RefugeeNeed = mongoose.model<IRefugeeNeed>('RefugeeNeed', refugeeNeedSchema);

export default RefugeeNeed;