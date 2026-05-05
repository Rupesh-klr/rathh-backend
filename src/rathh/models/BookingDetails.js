import mongoose from 'mongoose';


const bookingUserSchema = new mongoose.Schema({
  name: { type: String },
  mobile: { type: String },
  email: { type: String },
  age: { type: String },
  location: { type: String }
}, { _id: false });

const bookingDetailsSchema = new mongoose.Schema({
  adminName: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'EventDetails', required: true },
  eventName: { type: String, required: true },
  eventDate: { type: String },
  eventLocation: { type: String },
  users: { type: [bookingUserSchema], required: true },
  status: { type: String, default: 'booked' }
}, { timestamps: true });

export default mongoose.model('BookingDetails', bookingDetailsSchema);