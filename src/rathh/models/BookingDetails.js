import mongoose from 'mongoose';

const bookingDetailsSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventDetails', required: true },
  user: { type: String, required: true },
  seats: { type: Number, default: 1 },
  status: { type: String, default: 'booked' },
  // Add more fields as needed
}, { timestamps: true });

export default mongoose.model('BookingDetails', bookingDetailsSchema);