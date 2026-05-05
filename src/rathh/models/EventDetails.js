import mongoose from 'mongoose';

const eventDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String },
  description: { type: String },
  // Add more fields as needed
}, { timestamps: true });

export default mongoose.model('EventDetails', eventDetailsSchema);