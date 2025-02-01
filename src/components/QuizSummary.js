import React, { useEffect, useState } from 'react';
import '../style/summery.css';

const QuizSummary = ({ selectedOptions, quizData }) => {
   // Timer state
  const [timeLeft, setTimeLeft] = useState(60);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer); 
    }
  }, [timeLeft]);

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    selectedOptions.forEach((option) => {
      if (option?.is_correct) {
        score += 4; 
      }
    });
    return score;
  };

  // Total number of questions
  const totalQuestions = quizData.questions.length;

  // Attended questions (those with selected answers)
  const attendedQuestions = selectedOptions.filter((option) => option !== null).length;

  const score = calculateScore();
  const correctAnswers = selectedOptions.filter((option) => option?.is_correct).length;

  return (
    <div className="quiz-summary">
      <h2 className="quiz-title">Quiz Completed!</h2>
      <div className="score-summary">
        <p><strong>Your score:</strong> {score} / {totalQuestions * 4}</p>
        <p><strong>Total Questions:</strong> {totalQuestions}</p>
        <p><strong>Questions Attended:</strong> {attendedQuestions}</p>
        <p><strong>Correct Answers:</strong> {correctAnswers}</p>
        <p><strong>Time Left:</strong> {timeLeft} seconds</p>
      </div>

      <h3 className="review-title">Review Your Answers:</h3>
      {quizData.questions.map((question, index) => {
        const selectedOption = selectedOptions[index];
        const correctOption = question.options.find((opt) => opt.is_correct);

        return (
          <div key={question.id} className={`question-review ${selectedOption?.is_correct ? 'correct' : 'incorrect'}`}>
            <h4>Question {index + 1}: {question.description}</h4>
            <p><strong>Your Answer:</strong> {selectedOption ? selectedOption.description : 'No answer selected'}</p>
            {selectedOption?.is_correct ? (
              <p className="feedback correct-feedback"><strong>Correct!</strong></p>
            ) : (
              <>
                <p className="feedback incorrect-feedback"><strong>Correct Answer:</strong> {correctOption.description}</p>
                <p><strong>Explanation:</strong> {question.detailed_solution}</p>
              </>
            )}
          </div>
        );
      })}

      <button className="restart-btn" onClick={() => window.location.reload()}>Restart Quiz</button>
    </div>
  );
};

export default QuizSummary;
