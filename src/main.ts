/* eslint-disable no-param-reassign,no-nested-ternary */
import './style.css';
import { Positions, positions, secondPositions, Side, Size } from './types';
import { createNewElement, getTrigger, isSideX, isSideY } from './utils';

const UP = 'ArrowUp';
const DOWN = 'ArrowDown';
const LEFT = 'ArrowLeft';
const RIGHT = 'ArrowRight';
const keys = [UP, DOWN, LEFT, RIGHT];

let position: null | number = null;
const MAX_POSITION = positions.length;

const activeClass = 'active';

const getActive = () =>
  document.querySelector<HTMLButtonElement>(`.${activeClass}`);

const resetActive = () => getActive()?.classList.remove(activeClass);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.bttHandler = async (trigger: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await window.callBTT('trigger_named', {
    trigger_name: trigger,
    // close popup
    closeFloatingHTMLMenu: 1,
  });
  position = null;
  resetActive();
};

const activate = () => {
  resetActive();
  const next = document.querySelector(`#list button:nth-child(${position})`);
  if (next) {
    next.classList.add(activeClass);
  }
};

const go = (key: string) => {
  switch (key) {
    case RIGHT: {
      position = position ? (position < MAX_POSITION ? position + 1 : 1) : 7;
      break;
    }
    case LEFT: {
      position = position ? (position > 1 ? position - 1 : MAX_POSITION) : 10;
      break;
    }
    case UP:
      position = position ? position - 4 : 6;
      if (position < 1) {
        position += MAX_POSITION;
      }
      break;
    case DOWN:
      position = position ? position + 4 : 11;
      if (position > MAX_POSITION) {
        position -= MAX_POSITION;
      }
      break;
    default:
      break;
  }
  activate();
};

document.addEventListener('keydown', e => {
  if (keys.includes(e.key)) {
    e.preventDefault();
    e.stopImmediatePropagation();
    go(e.key);
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    e.stopImmediatePropagation();
    getActive()?.click();
  }
});

const createIcon = ([size, side]: [Size, Side]) => {
  let content = '';
  let style = '';
  let domSize: [number, number] = [0, 0];
  switch (size) {
    case Size.Quarter:
      domSize = [50, 50];
      break;
    case Size.QuarterCenter:
      domSize = [50, 50];
      if (isSideX(side)) {
        style += 'top: 25%;';
      } else {
        style += 'left: 25%;';
      }
      break;
    case Size.Half: {
      domSize = [100, 50];
      break;
    }
    case Size.TwoThird:
      domSize = [100, 75];
      break;
    case Size.OneThird:
      domSize = [100, 25];
      break;
    case Size.Full:
      domSize = [100, 100];
      break;
    case Size.FullBright:
      domSize = [100, 100];
      style += 'background: #fff; color: #1a1a1a;';
      break;
    default:
      break;
  }

  switch (side) {
    case Side.Next:
      content = '⬅';
      break;
    case Side.ResizeX:
      content = '↔';
      break;
    case Side.ResizeY:
      content = '↕';
      break;
    default:
      break;
  }

  if (isSideX(side)) {
    domSize.reverse();
  } else if (!isSideY(side)) {
    style += 'left: 0; top: 0;';
  }

  style += `width: ${domSize[0]}%; height: ${domSize[1]}%;`;

  return `<span class="icon ${side}" style="${style}">${content}</span>`;
};

function renderSettings() {
  const settings = createNewElement('settings');
  settings.innerHTML = positions
    .map(
      pos => `
  <div class="settings-item">
  <div class="icon-wrap">${createIcon(pos)}</div>
  <input type="checkbox" />
  </div>
  `
    )
    .join('');

  document.body.appendChild(settings);
}

const renderList = (el: HTMLDivElement, preset: Positions) => {
  const elements = preset.map(pos => {
    return `
        <button onclick="bttHandler('${getTrigger(pos)}')">
          ${createIcon(pos)}
        </button>
    `;
  });
  el.innerHTML = `<div id="list">${elements.join('')}</div>`;
};

async function init() {
  const app = document.getElementById('app');
  if (!(app instanceof HTMLDivElement)) {
    // eslint-disable-next-line no-alert
    alert('App element not found');
    return;
  }
  renderList(app, positions);
  if (secondPositions) {
    renderList(createNewElement('side'), secondPositions);
  }
}
document.addEventListener('DOMContentLoaded', init);
