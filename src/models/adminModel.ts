import mongoose, { Schema, Document } from 'mongoose';

interface IActivityLog extends Document {
  action: string;
  user_id: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ActivityLogSchema: Schema = new Schema({
  action: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true });

const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);

export default ActivityLog;
