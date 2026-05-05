import mongoose from 'mongoose';

const userDetailsSchema = new mongoose.Schema({
  username: { type: String, trim: true },
  email: { type: String, trim: true },
  mobile: { type: String, trim: true },
  password: { type: String, required: true },
  // Add more fields as needed
}, { timestamps: true });

// At least one of username, email, or mobile must be present
userDetailsSchema.pre('validate', function(next) {
  if (!this.username && !this.email && !this.mobile) {
    this.invalidate('username', 'At least one of username, email, or mobile is required');
  }
  next();
});

export default mongoose.model('UserDetails', userDetailsSchema);