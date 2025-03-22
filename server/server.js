import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL, // Your Render frontend URL
    'http://localhost:3000' // Local development
  ],
  credentials: true // Enable if using cookies/auth headers
};

app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS with options
await connectDB();

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send("API Working"));

app.listen(PORT, () => console.log("Server running on port " + PORT));
