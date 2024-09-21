import React, { useState } from 'react';
import styles from './OSQuiz.module.css';
import { useNavigate } from "react-router-dom";
import { backendUrl } from '../../utils/config.js';

const OSQuiz = ({subject}) => {
  const [quizzes, setQuizzes] = useState([
    { question: '', options: ['', '', '', ''], correctOptionIndex: null },
    { question: '', options: ['', '', '', ''], correctOptionIndex: null },
    { question: '', options: ['', '', '', ''], correctOptionIndex: null },
    { question: '', options: ['', '', '', ''], correctOptionIndex: null },
    { question: '', options: ['', '', '', ''], correctOptionIndex: null },
    { question: '', options: ['', '', '', ''], correctOptionIndex: null },
    { question: '', options: ['', '', '', ''], correctOptionIndex: null },
    { question: '', options: ['', '', '', ''], correctOptionIndex: null },
    { question: '', options: ['', '', '', ''], correctOptionIndex: null },
    { question: '', options: ['', '', '', ''], correctOptionIndex: null },
  ]);

  const navigate = useNavigate();

  const handleOptionChange = (quizIndex, optionIndex, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].options[optionIndex] = value;
    setQuizzes(updatedQuizzes);
  };

  const handleQuestionChange = (quizIndex, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].question = value;
    setQuizzes(updatedQuizzes);
  };

  const handleCorrectOptionChange = (quizIndex, optionIndex) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].correctOptionIndex = optionIndex;
    setQuizzes(updatedQuizzes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}api/v1/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: subject,
          questions: quizzes,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigate("/success");
      } else {
        alert('Failed to save quiz');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the quiz');
    }
  };

  return (
    <form className={styles.quizForm} onSubmit={handleSubmit}>
      <h2>Crating a quiz for {subject}</h2>
      {quizzes.map((quiz, quizIndex) => (
        <div key={quizIndex} className={styles.quizItem}>
          <label>
            Question {quizIndex + 1}:
            <input
              type="text"
              value={quiz.question}
              onChange={(e) => handleQuestionChange(quizIndex, e.target.value)}
              className={styles.questionInput}
            />
          </label>
          <div className={styles.optionsContainer}>
            {quiz.options.map((option, optionIndex) => (
              <div key={optionIndex} className={styles.optionWrapper}>
                <input
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(quizIndex, optionIndex, e.target.value)
                  }
                  className={styles.optionInput}
                />
                <label>
                  <input
                    type="radio"
                    name={`correctOption-${quizIndex}`}
                    checked={quiz.correctOptionIndex === optionIndex}
                    onChange={() => handleCorrectOptionChange(quizIndex, optionIndex)}
                    className={styles.correctOptionRadio}
                  />
                  Correct Answer
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="submit" className={styles.submitBtn}>
        Submit Quiz
      </button>
    </form>
  );
};

export default OSQuiz;
