import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './error/error.js';
import cgateRouter from './routes/cgateRoute.js';
import quizRouter from './routes/quizRoute.js';

const app = express();
dotenv.config({ path: './config/config.env' });
app.use(express.json());

// Allowed origins
const allowedOrigins = ['https://c-gate-orcin.vercel.app/'];

const corsOptions = {
  origin: ['https://c-gate-orcin.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies to be sent with requests
};

// Use CORS with the specified options
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/api/v1/cgate', cgateRouter);
app.use('/api/v1/quiz', quizRouter);


// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
