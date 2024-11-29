import mongoose, { Schema, Document } from 'mongoose';

interface IMaterialDonation extends Document {
  id: Number;
  name: string;
  quantity: number;
  description: string;
  materialStatus: 'new' | 'used';
  donation_request_id: mongoose.Types.ObjectId;
}

const MaterialDonationSchema = new Schema<IMaterialDonation>({
  id: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  materialStatus: {
    type: String,
    enum: ['new', 'used'],
    required: true
  },
  donation_request_id: {
    type: Schema.Types.ObjectId,
    required: false
  },
});

const MaterialDonation = mongoose.model<IMaterialDonation>('MaterialDonation', MaterialDonationSchema);

export default MaterialDonation;
