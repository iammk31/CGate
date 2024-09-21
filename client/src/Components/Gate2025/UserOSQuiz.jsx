import React, { useState, useEffect } from 'react';
import styles from './UserOSQuiz.module.css';
import { backendUrl } from '../../utils/config.js';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';
import { useNavigate } from 'react-router-dom';
const Quiz = () => {
  const [subject, setSubject] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token]);

  // Fetch the quiz based on selected subject
  useEffect(() => {
    if (subject) {
      const fetchQuiz = async () => {
        try {
          const response = await fetch(`${backendUrl}api/v1/quiz/${subject}`); // Fetch the quiz based on subject

          if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions);
          }
          else {
            alert("Please wait we will upload the quiz soon");
  navigate("/");
          }
        } catch (error) {
          console.error('Error fetching quiz:', error);
        }
      };
      fetchQuiz();
    }
  }, [subject]);
  
  // Store the selected option text in userAnswers
  const handleOptionSelect = (optionText) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = optionText; // Save the text of the selected option
    setUserAnswers(updatedAnswers);
  };

  const handleNextClick = () => {
    if (loggedIn) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateScore();
        setIsQuizComplete(true);
      }
    } else {
      alert('Please login to continue');
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

  const handleSubjectSelect = (e) => {
    setSubject(e.target.value);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setIsQuizComplete(false);
  };

  return (
    <>
    <Navbar />
    <div className="container mt-5 mb-5 bg-[#ad48483a] p-5">
      {!subject ? (
        <>
          <h1 className="text-center text-[#333] mb-5">Select a Subject for Quiz</h1>
          <div className="flex justify-center ">
            <select onChange={handleSubjectSelect} className={"form-select"}>
              <option value="">Select Subject</option>
              <option value="OS">Operating Systems</option>
              <option value="DBMS">Database Management Systems</option>
              <option value="DSA">Data Structures & Algorithms</option>
              
            </select>
          </div>
        </>
      ) : (
        <>
          <h2 className={"text-center"}>Subject: {subject}</h2>
          {isQuizComplete ? (
            <div className={"flex flex-col justify-center items-center"}>
              <h2 className={"text-center"}>Quiz Complete!</h2>
              <p className={"text-center mt-5 "}>You scored: {score} out of {questions.length}</p>
              <div className={"flex flex-col justify-center items-center w-full gap-2 "}>
                {questions.map((question, index) => (
                  <div key={index} className={"flex flex-col justify-center items-center bg-white w-full "}>
                    <p >
                      {index + 1}. {question.question}
                    </p>
                    <p className={userAnswers[index] === question.options[question.correctOptionIndex] ? "text-green-500" : "text-red-500"}>
                      Your Answer: {userAnswers[index]}
                    </p>
                    <p className={"text-center text-teal-500"}>
                      Correct Answer: {question.options[question.correctOptionIndex]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={"flex flex-col justify-center items-start"}>
              {questions.length > 0 ? (
                <>
                  <p className={"text-center text-red-500"}>
                    {currentQuestion + 1}. {questions[currentQuestion].question}
                  </p>
                  <div className={"flex flex-col "}>
                    {questions[currentQuestion].options.map((option, index) => (
                      <label key={index} className={"flex items-center gap-2 w-full"}>
                        <input
                          type="radio"
                          name="answer"
                          value={option} // Use the option text as the value
                          className={"mr-2 w-4 h-4 mt-2"}
                          onChange={() => handleOptionSelect(option)} // Pass the option text to the handler
                          checked={userAnswers[currentQuestion] === option} // Compare saved option text with the current option text
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                  <button onClick={handleNextClick} className={"bg-black mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                    {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
                  </button>
                </>
              ) : (
                <p>No questions found.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
    <Footer />
    </>
  );
};

export default Quiz;
