import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctOptionIndex: { type: Number, required: true }, // Stores index of the correct option
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
