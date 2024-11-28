import mongoose, { Schema, Document } from 'mongoose';

interface IPayment extends Document {
  id: Number;
  title: string;
  description: string;
  moneyAmount: number;
  refugee_id: mongoose.Types.ObjectId;
  refugee_stripe: string;
  user_id: mongoose.Types.ObjectId;
}

const PaymentSchema = new Schema<IPayment>({
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
  moneyAmount: {
    type: Number,
    required: false
  },
  refugee_id: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  refugee_stripe: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
},

});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
