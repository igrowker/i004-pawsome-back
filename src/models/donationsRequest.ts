import mongoose, { Schema, Document } from 'mongoose';

interface IDonationRequest extends Document {
  id: Number;
  title: string;
  description: string;
  targetAmountMoney: number;
  refugee_id: mongoose.Types.ObjectId;
  status: 'active' | 'completed' | 'canceled';
  item: string
}

const DonationRequestSchema = new Schema<IDonationRequest>({
  id: {
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  targetAmountMoney: {
    type: Number,
    required: false
  },
  refugee_id: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'canceled'],
    default: 'active',
    required: true
  },
  item: {
    type: String,
    required: false
  },
});

const DonationRequest = mongoose.model<IDonationRequest>('DonationRequest', DonationRequestSchema);

export default DonationRequest;
