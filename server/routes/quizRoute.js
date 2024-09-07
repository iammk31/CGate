import express from 'express';
import Quiz from '../models/quizModel.js';

const router = express.Router();

// Admin submits quiz
router.post('/submit', async (req, res) => {
  try {
    const { subject, questions } = req.body;
    const quiz = new Quiz({ subject, questions });
    const savedQuiz = await quiz.save();
    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully!',
      data: savedQuiz,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz',
      error: error.message,
    });
  }
});

// User fetches quiz by subject
router.get('/:subject', async (req, res) => {
  try {
    const subject = req.params.subject;
    const quiz = await Quiz.findOne({ subject });
    if (quiz) {
      res.status(200).json({ success: true, questions: quiz.questions });
    } else {
      res.status(404).json({ success: false, message: 'Quiz not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching quiz' });
  }
});

export default router;
