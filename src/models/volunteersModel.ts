import mongoose, { Document, Schema } from 'mongoose';

interface IVolunteerOpportunity extends Document {
  refugee_id: mongoose.Types.ObjectId;
  description: string;
  requirements: string;
  availability: string;
}

const VolunteerOpportunitySchema: Schema = new Schema({
  refugee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Refugee',
    required: true
  },
  description: {
    type: String,
    required: true 
  },
  requirements: {
    type: String,
    required: true 
  },
  availability: { 
    type: String,
    required: true
  }
});

const Volunteer = mongoose.model<IVolunteerOpportunity>('VolunteerOpportunity', VolunteerOpportunitySchema);

export default Volunteer;
