import React, { useState, useEffect } from 'react';
import styles from './UserOSQuiz.module.css';
import { backendUrl } from '../../utils/config.js';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`${backendUrl}api/v1/quiz/OS`); // Fetch the quiz based on subject
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, []);

  // Store the selected option text in userAnswers
  const handleOptionSelect = (optionText) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = optionText; // Save the text of the selected option
    setUserAnswers(updatedAnswers);
  };

  const handleNextClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setIsQuizComplete(true);
    }
  };

  // Calculate score by matching the correct option text with the selected option text
  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      const correctAnswerText = question.options[question.correctOptionIndex];
      const selectedAnswerText = userAnswers[index];
      
      if (correctAnswerText === selectedAnswerText) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
  };

  return (
    <div className={styles.quizContainer}>
      <h1 className={styles.title}>OS Quiz</h1>
      {isQuizComplete ? (
        <div className={styles.resultContainer}>
          <h2 className={styles.resultTitle}>Quiz Complete!</h2>
          <p className={styles.resultScore}>You scored: {score} out of {questions.length}</p>
          <div className={styles.questionList}>
            {questions.map((question, index) => (
              <div key={index} className={styles.questionResult}>
                <p className={styles.questionText}>
                  {index + 1}. {question.question}
                </p>
                <p className={userAnswers[index] === question.options[question.correctOptionIndex] ? styles.correct : styles.incorrect}>
                  Your Answer: {userAnswers[index]}
                </p>
                <p className={styles.correctAnswer}>
                  Correct Answer: {question.options[question.correctOptionIndex]}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.questionContainer}>
          {questions.length > 0 ? (
            <>
              <p className={styles.questionText}>
                {currentQuestion + 1}. {questions[currentQuestion].question}
              </p>
              <div className={styles.optionsContainer}>
                {questions[currentQuestion].options.map((option, index) => (
                  <label key={index} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name="answer"
                      value={option} // Use the option text as the value
                      className={styles.radioInput}
                      onChange={() => handleOptionSelect(option)} // Pass the option text to the handler
                      checked={userAnswers[currentQuestion] === option} // Compare saved option text with the current option text
                    />
                    {option}
                  </label>
                ))}
              </div>
              <button onClick={handleNextClick} className={styles.nextButton}>
                {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </>
          ) : (
            <p>Loading quiz...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
