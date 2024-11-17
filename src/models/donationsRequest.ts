import mongoose, { Schema, Document } from 'mongoose';

interface IDonationRequest extends Document {
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  shelter: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'canceled';
}

const DonationRequestSchema = new Schema<IDonationRequest>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  targetAmount: {
    type: Number,
    required: true
  },
  currentAmount: {
    type: Number,
    default: 0
  },
  shelter: {
    type: Schema.Types.ObjectId,
    ref: 'Shelter',
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'canceled'],
    default: 'active',
    required: true
  },
});

const DonationRequest = mongoose.model<IDonationRequest>('DonationRequest', DonationRequestSchema);

export default DonationRequest;
