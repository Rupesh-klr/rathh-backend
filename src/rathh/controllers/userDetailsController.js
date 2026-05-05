import UserDetails from '../models/UserDetails.js';
import bcrypt from 'bcryptjs';

// Create user
export const createUser = async (req, res, next) => {
  try {
    const { username, email, mobile, password } = req.body;
    if (!username && !email && !mobile) {
      return res.status(400).json({ message: 'At least one of username, email, or mobile is required' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new UserDetails({ username, email, mobile, password: hash });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await UserDetails.find().select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Get user by id
export const getUser = async (req, res, next) => {
  try {
    const user = await UserDetails.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const { username, email, mobile, password } = req.body;
    const update = { username, email, mobile };
    if (password) {
      update.password = await bcrypt.hash(password, 10);
    }
    const user = await UserDetails.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await UserDetails.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};

// Login
export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ message: 'Identifier and password required' });
    }
    // identifier can be username, email, or mobile
    const user = await UserDetails.findOne({
      $or: [
        { username: identifier },
        { email: identifier },
        { mobile: identifier }
      ]
    });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ message: 'Login successful', user: { _id: user._id, username: user.username, email: user.email, mobile: user.mobile } });
  } catch (err) {
    next(err);
  }
};
