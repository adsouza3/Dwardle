import React from 'react';

import classNames from 'classnames';

const Alphabet = ({ answer, guesses }) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return (
    <div className="guess-wrapper">
      {[...alphabet].map((letter, key) => {
        let correct, close, present;
        guesses.forEach((guess) => {
          for (let i = 0; i < answer.length; i++) {
            if (answer[i] === letter && answer[i] === guess[i]) {
              correct = true;
              close = false;
              return;
            }
          }
          close |= answer.indexOf(letter) !== -1 && guess.indexOf(letter) !== -1;
          present |= guess.indexOf(letter) !== -1;
        });
        const incorrect = present && !correct && !close ;
        const className = classNames('guess-letter', { correct, close, incorrect });

        return <div className={className} key={key} >{letter}</div>;
      })}
    </div>
  );
};

export default Alphabet;