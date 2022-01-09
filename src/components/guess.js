import React from 'react';

import classNames from 'classnames';

const Guess = ({ answer, failed, guess, inProgress }) => {
  return (
    <div className="guess-wrapper">
      {[...answer].map((answerLetter, i) => {
        let correct, close, incorrect;
        if (!inProgress & !failed) {
          correct = answerLetter === guess[i];
          close = !correct && answer.indexOf(guess[i]) !== -1;
          incorrect = !correct && !close;
        }
        const className = classNames('guess-letter', { correct, close, failed, incorrect });

        return <div className={className} key={i} >{guess[i] || ''}</div>;
      })}
    </div>
  );
};

export default Guess;