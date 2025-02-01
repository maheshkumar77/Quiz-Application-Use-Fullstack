import React, { useState, useEffect } from 'react';
import QuestionList from './components/QuestionList';
import QuizSummary from './components/QuizSummary';
import Timer from './components/Timer';
import StartQuiz from './components/StartQuiz';
import './App.css';
import axios from 'axios';

const App = () => {
  const [quizData, setQuizData] = useState(null); // Initialize with null
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Timer state

  // Fetch quiz data from the API
  useEffect(() => {
    const getQuizData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/quizdata');
        setQuizData(response.data); 
      } catch (error) {
        console.error("Error fetching quiz data", error);
      }
    };
    getQuizData();
  }, []);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    if (currentQuestionIndex === quizData.questions.length - 1) {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0)); 
  };

  const handleOptionChange = (questionIndex, option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[questionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  if (!quizData) {
    return <div className="loading">Loading quiz...</div>; 
  }

  return (
    <div className="quiz-container">
      {quizStarted ? (
        quizCompleted ? (
          <QuizSummary selectedOptions={selectedOptions} quizData={quizData} />
        ) : (
          <>
            <Timer timeLeft={timeLeft} />
            <QuestionList
              quizData={quizData}
              currentQuestionIndex={currentQuestionIndex}
              onOptionChange={handleOptionChange}
            />
            <div className="navigation-buttons">
              {/* Previous Button */}
              <button 
                onClick={handlePreviousQuestion} 
                disabled={currentQuestionIndex === 0} 
              >
                Previous Question
              </button>

              {/* Next/Submit Button */}
              <button onClick={handleNextQuestion}>
                {currentQuestionIndex === quizData.questions.length - 1
                  ? 'Submit Quiz'
                  : 'Next Question'}
              </button>
            </div>
          </>
        )
      ) : (
        <StartQuiz onStartQuiz={handleStartQuiz} />
      )}
    </div>
  );
};

export default App;
