import { produce } from 'immer';

import words from '../lib/words';

const newWord = () => {
  for(let i = 0; i < 100; i++) {
    let word = words[Math.floor(Math.random() * words.length)];
    let letters = new Set();
    [...word].forEach(letter => letters.add(letter));
    if (letters.size === word.length) {
      return word;
    }
  }
};

export const initialState = {
  answer: newWord(),
  failed: false,
  guesses: [],
  text: ''
};

export const reducer = produce((draft, action) => {
  switch (action.type) {
  case 'add_letter':
    draft.text = draft.text.length >= 5 ? draft.text : draft.text + action.letter;
    break;
  case 'delete_letter':
    draft.text = draft.text.slice(0, -1);
    break
  case 'guess':
    if (draft.text.length === 5) {
      draft.guesses = [...draft.guesses, draft.text];
      draft.text = '';
    }
    break;
  case 'new_word':
    draft.answer = newWord();
    break;
  case 'fail':
    draft.failed = true;
    break;
  case 'reset':
    draft.answer = newWord();
    draft.failed = initialState.failed;
    draft.guesses = initialState.guesses;
    draft.text = initialState.text;
    break;
  default:
    return draft;
  }
}, {});;