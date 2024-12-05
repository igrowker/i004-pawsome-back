import mongoose, { Schema, Document } from "mongoose";

interface IDonationRequest extends Document {
  donationId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  targetAmountMoney?: number;
  targetItemsCount?: number;
  isMonetaryDonation: boolean;
  imageUrl?: string;
  refugee_id: mongoose.Types.ObjectId;
  status: "active" | "completed" | "canceled";
  item: string;
}

const DonationRequestSchema = new Schema<IDonationRequest>({
  donationId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
    default:
      "https://aguacatec.es/wp-content/uploads/2023/10/e5a978b8-6772-4c85-a50e-15581af7d483.png",
  },
  isMonetaryDonation: {
    type: Boolean,
    required: false,
  },
  targetAmountMoney: {
    type: Number,
    required: function (this: IDonationRequest) {
      return this.isMonetaryDonation; // Requerido solo si es donación monetaria
    },
  },
  targetItemsCount: {
    type: Number,
    required: function (this: IDonationRequest) {
      return !this.isMonetaryDonation; // Requerido solo si es donación en especie
    },
  },
  refugee_id: {
    type: Schema.Types.ObjectId,
    ref: "refugee",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed", "canceled"],
    default: "active",
    required: true,
  },
});

const DonationRequest = mongoose.model<IDonationRequest>(
  "DonationRequest",
  DonationRequestSchema
);

export default DonationRequest;
