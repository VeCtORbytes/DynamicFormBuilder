import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import templatesRouter from './routes/templates.js';
import submissionsRouter from './routes/submissions.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Use the routes
app.use('/api/templates', templatesRouter);
app.use('/api/submissions', submissionsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
