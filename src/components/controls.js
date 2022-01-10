import React from 'react';

const Controls = ({ answer, guesses }) => {
  return (
    <div className="controls">
      <div>Ctrl+L:  Give Up</div>
      <div>Ctrl+N:  New Game</div>
    </div>
  );
};

export default Controls;