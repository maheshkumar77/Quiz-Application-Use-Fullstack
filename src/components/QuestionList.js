import React from 'react';
import Question from './Question';

const QuestionList = ({ quizData, currentQuestionIndex, onOptionChange }) => {
  const currentQuestion = quizData.questions[currentQuestionIndex];
  return (
    <div className="question-list">
      <Question
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        onOptionChange={onOptionChange}
      />
    </div>
  );
};

export default QuestionList;
