import mongoose, { Schema, Document } from 'mongoose';

interface IBlacklist extends Document {
    token: string;
}

const blacklistSchema = new Schema<IBlacklist>({
    token: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Blacklist = mongoose.model<IBlacklist>('Blacklist', blacklistSchema);

export default Blacklist;
