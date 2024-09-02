import React, { useState } from 'react';
import styles from './UserOSQuiz.module.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      questionText: 'hello',
      options: ['a', 'b', 'c', 'd'],
    },
    {
      questionText: '',
      options: [],
    },
    {
      questionText: '',
      options: [],
    },
    {
      questionText: '',
      options: [],
    },
    {
      questionText: '',
      options: [],
    },
    {
      questionText: '',
      options: [],
    },
    {
      questionText: '',
      options: [],
    },
    {
      questionText: '',
      options: [],
    },
    {
      questionText: '',
      options: [],
    },
    {
      questionText: '',
      options: [],
    },
  ];

  const handleNextClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert('You have completed the quiz!');
      setCurrentQuestion(0); // Reset to the first question or handle it as needed
    }
  };

  return (
    
    <div className={styles.quizContainer}>
      <h1 className={styles.title}>OS Quiz</h1>
      <p className={styles.subtitle}>Fill out this OS quiz!</p>
      <div className={styles.questionContainer}>
        <p className={styles.questionText}>
          {questions[currentQuestion].questionText}
        </p>
        <div className={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <label key={index} className={styles.optionLabel}>
              <input type="radio" name="answer" value={option} className={styles.radioInput} />
              {option}
            </label>
          ))}
        </div>
        <button onClick={handleNextClick} className={styles.nextButton}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
