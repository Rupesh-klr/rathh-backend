import EventDetails from '../models/EventDetails.js';

export const getAllEventDetails = async (req, res) => {
  try {
    const events = await EventDetails.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventDetailsById = async (req, res) => {
  try {
    const event = await EventDetails.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEventDetails = async (req, res) => {
  try {
    console.log('Creating event with data:', req.body);
    const event = new EventDetails(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateEventDetails = async (req, res) => {
  try {
    const event = await EventDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEventDetails = async (req, res) => {
  try {
    const event = await EventDetails.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};