import React from 'react';

const StartQuiz = ({ onStartQuiz }) => {
  return (
    <div className="start-quiz">
      <h2>Welcome to the Quiz!</h2>
      <p>Click the button below to start the quiz.</p>
      <button onClick={onStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default StartQuiz;
