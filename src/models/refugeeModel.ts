import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IRefugee extends Document {
    user_id: Types.ObjectId;
    name_refugee: string;
    description: string;
    img: string;
    pets: Types.ObjectId[];    
    opportunities: Types.ObjectId[]
}

export interface RefugeeInput {
    user_id: string;
    name_refugee: string;
    description: string;
    img?: string;
}

const refugeeSchema = new Schema<IRefugee>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    name_refugee: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "https://res.cloudinary.com/dfktz8zkt/image/upload/v1732301708/ur547ht6w6rjuqq2diad.png"
    },
    pets: {
        type: [Schema.Types.ObjectId], 
        ref: 'Animal',
        default: [],
    },
    opportunities: {
        type: [Schema.Types.ObjectId],
        ref: "Volunteer",
        default: []
    }
});

const Refugee = mongoose.model<IRefugee>('Refugee', refugeeSchema);

export default Refugee;
