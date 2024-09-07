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

app.use(
  cors({
    origin: *,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/cgate', cgateRouter);
app.use('/api/v1/quiz', quizRouter);
app.get('/', (req, res) => {
  res.send('Server is running');
});

dbConnection();

app.use(errorMiddleware);

export default app;
