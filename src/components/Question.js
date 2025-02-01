import React from 'react';

const Question = ({ question, questionIndex, onOptionChange }) => {
  return (
    <div className="question-container">
      <h2>{question.description}</h2>
      {question.options.map((option) => (
        <div key={option.id}>
          <label>
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.id}
              onChange={() => onOptionChange(questionIndex, option)}
            />
            {option.description}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Question;
