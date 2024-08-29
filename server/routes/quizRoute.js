import express from 'express';
import Quiz from '../models/quizModel.js';

const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const quizzes = req.body;
    const savedQuizzes = await Quiz.insertMany(quizzes);
    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully!',
      data: savedQuizzes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz',
      error: error.message,
    });
  }
});

export default router;
