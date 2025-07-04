import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Connection error:', error);
});

db.once('open', () => {
  console.log('Database connected');
});
