import mongoose from 'mongoose';

const eventDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  // Add more fields as needed
  refs: [
    {
      type: { type: String },
      url: { type: String }
    }
  ]
}, { timestamps: true });

export default mongoose.model('EventDetails', eventDetailsSchema);