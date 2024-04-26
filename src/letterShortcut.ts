import { getGridPosition } from './utils';

let isVisible = false;

const restorePosition = () => {
  const value = localStorage.getItem('isVisible');
  if (value) {
    isVisible = value === 'true';
  }
};

export function setLetterVisibility(app?: HTMLDivElement) {
  const el = app ?? document.querySelector<HTMLDivElement>('#list');
  if (el == null) {
    return;
  }
  if (isVisible) {
    el.classList.add('letter-visible');
  } else {
    el.classList.remove('letter-visible');
  }
}
export function initLetterVisibility() {
  restorePosition();
  // setPosition();
}
export function toggleLetterVisibility() {
  isVisible = !isVisible;
  localStorage.setItem('isVisible', isVisible.toString());
  setLetterVisibility();
}

const numberToLetter = (num: number): string => {
  switch (num) {
    case 1:
      return 's';
    case 2:
      return 'd';
    case 3:
      return 'f';
    case 4:
      return 'g';
    default:
      return '';
  }
};

const LETTER_1 = 's';
const LETTER_2 = 'd';
const LETTER_3 = 'f';
const LETTER_4 = 'g';
const lettersList = new Set([LETTER_1, LETTER_2, LETTER_3, LETTER_4]);
const letterNumberMap = new Map([
  [LETTER_1, 1],
  [LETTER_2, 2],
  [LETTER_3, 3],
  [LETTER_4, 4],
]);

let matchInProgress: Array<string> = [];

export function isShortcutLetter(key: string): boolean {
  const isShortcut = lettersList.has(key);
  if (!isShortcut && matchInProgress.length !== 0) {
    matchInProgress = [];
  }
  return isShortcut;
}
export function isShortcutLetterMatched(key: string): null | number {
  matchInProgress.push(key);
  if (matchInProgress.length === 2) {
    const [first, second] = matchInProgress;
    matchInProgress = [];
    const row = letterNumberMap.get(first) ?? 0;
    const column = letterNumberMap.get(second) ?? 0;
    const position = (row - 1) * 4 + column;

    return position;
  }
  return null;
}

function getLetters(displayLayer: string, index: number) {
  const position = getGridPosition(index);
  const rowLetter = numberToLetter(position.row);
  const columnLetter = numberToLetter(position.column);
  if (displayLayer === rowLetter) {
    return columnLetter;
  }
  if (displayLayer !== '') {
    return '';
  }
  return rowLetter + columnLetter;
}
export function getLettersForIndex(
  displayLayer: string,
  index: number
): string {
  const letters = getLetters(displayLayer, index);
  if (letters) {
    return `<span class="letter">${letters}</span>`;
  }
  return '';
}
