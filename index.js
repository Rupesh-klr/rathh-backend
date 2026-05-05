
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL_RATHH;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
  res.send('Rathh backend server running!');
});


import rathhApp from './src/rathh/app.js';
app.use('/api/v1/rathh', rathhApp);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
