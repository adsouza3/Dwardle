import React, { useCallback, useEffect, useReducer } from 'react';

import { initialState, reducer } from '../store';
import Alphabet from './alphabet';

import Guess from './guess';

import './styles.css';

const Board = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onKeyDown = useCallback(event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
      event.preventDefault();
      dispatch({ type: 'reset'})
    } else if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
      event.preventDefault();
      dispatch({ type: 'fail'})
    } else if (event.key === 'Enter') {
      dispatch({ type: 'guess'})
    } else if (event.key === 'Backspace') {
      dispatch({ type: 'delete_letter'})
    } else if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
      dispatch({ type: 'add_letter', letter: event.key });
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);

    return () => document.removeEventListener('keydown', onKeyDown, false);
  }, []);

  const { answer, failed, guesses, text } = state;

  return (
    <div className="board-wrapper">
      <div className="game-wrapper">
        {guesses.map((guess, i) => {
          return <Guess answer={answer} guess={guess} key={i}/>
        })}
        {guesses[guesses.length - 1] !== answer && !failed && (
          <Guess answer={answer} guess={text} inProgress/>
        )}
        {failed && <Guess answer={answer} guess={answer} failed />}
      </div>
      <div className="sidebar">
        <Alphabet answer={answer} guesses={guesses}/>
      </div>
    </div>
  );
};

export default Board;