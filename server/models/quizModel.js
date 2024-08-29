import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
