import { Side, Size } from './types';

export const isSideX = (side: Side) =>
  side === Side.Left || side === Side.Right || side === Side.MiddleX;

export const isSideY = (side: Side) =>
  side === Side.Top || side === Side.Bottom || side === Side.MiddleY;

export const getTrigger = ([size, side]: [Size, Side]) => {
  const trigger = [];

  switch (size) {
    case Size.Quarter:
      trigger.push('quarter');
      trigger.push(side);

      switch (side) {
        case Side.Top:
          trigger.push('left');
          break;
        case Side.Right:
          trigger.push('top');
          break;
        case Side.Bottom:
          trigger.push('right');
          break;
        case Side.Left:
          trigger.push('bottom');
          break;
      }
      break;
    case Size.QuarterCenter:
      trigger.push('quarter');
      trigger.push(side);
      trigger.push('center');
      break;
    case Size.Half:
      trigger.push('half');
      trigger.push(side);
      break;
    case Size.OneThird:
      trigger.push('one_third');
      trigger.push(side);
      break;
    case Size.TwoThird:
      trigger.push('two_third');
      trigger.push(side);
      break;
    case Size.Full: {
      if (side === Side.Next) {
        trigger.push('next_monitor_full');
      } else if (side === Side.Top) {
        trigger.push('maximize');
      }
      break;
    }
    case Size.FullBright: {
      trigger.push(side === Side.Next ? 'next_monitor' : side);
      break;
    }
  }
  return trigger.join('_');
};

export const createNewElement = (id: string) => {
  const existingElement = document.querySelector(`#${id}`);
  if (existingElement != null) {
    existingElement.parentNode?.removeChild(existingElement);
  }
  const element = document.createElement('div');
  element.setAttribute('id', id);
  document.body.appendChild(element);
  return element;
};
