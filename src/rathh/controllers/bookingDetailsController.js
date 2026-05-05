import BookingDetails from '../models/BookingDetails.js';

export const getAllBookingDetails = async (req, res) => {
  try {
    const bookings = await BookingDetails.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookingDetailsById = async (req, res) => {
  try {
    const booking = await BookingDetails.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createBookingDetails = async (req, res) => {
  try {
    const booking = new BookingDetails(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBookingDetails = async (req, res) => {
  try {
    const booking = await BookingDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBookingDetails = async (req, res) => {
  try {
    const booking = await BookingDetails.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};