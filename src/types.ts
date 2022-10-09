export enum Size {
  Quarter,
  QuarterCenter,
  Half,
  OneThird,
  TwoThird,
  Full,
  FullBright,
}

export enum Side {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
  MiddleX = 'middleX',
  MiddleY = 'middleY',
  Next = 'next',
  ResizeX = 'resizeX',
  ResizeY = 'resizeY',
}

const sides: Side[] = [Side.Top, Side.Right, Side.Bottom, Side.Left];

const getSides = (size: Size): Positions => sides.map(side => [size, side]);

export type Positions = Array<[Size, Side]>;

const quarters: Positions = getSides(Size.Quarter);
const quartersCenter: Positions = [
  ...getSides(Size.QuarterCenter),
  [Size.QuarterCenter, Side.MiddleX],
];

const halves: Positions = [
  ...getSides(Size.Half),
  [Size.Half, Side.MiddleX],
  [Size.Half, Side.MiddleY],
];

const oneThird = getSides(Size.OneThird);
const twoThird = getSides(Size.TwoThird);
const common: Positions = [
  [Size.Full, Side.Top],
  [Size.FullBright, Side.Next],
  [Size.Full, Side.Next],
  [Size.FullBright, Side.ResizeX],
  [Size.FullBright, Side.ResizeY],
];

const PRESET: Record<string, Positions> = {
  ALL: [
    ...quarters,
    ...quartersCenter,
    ...halves,
    ...oneThird,
    ...twoThird,
    ...common,
  ],
  BASE: [
    common[0],
    quartersCenter[4],
    common[1],
    common[2],
    twoThird[3],
    twoThird[1],
    common[3],
    common[4],
    halves[3],
    halves[1],
    quarters[0],
    quarters[1],
    halves[0],
    halves[2],
    quarters[2],
    quarters[3],
  ],
  BASE_VERTICAL: [
    common[0],
    quartersCenter[4],
    common[1],
    common[2],
    quarters[0],
    oneThird[0],
    halves[5],
    quartersCenter[0],
    quarters[1],
    oneThird[2],
    common[3],
    quartersCenter[2],
    quarters[2],
    quarters[3],
    quartersCenter[1],
    quartersCenter[3],
  ],
};

const getPreset = () => {
  const { width, height } = window.screen;

  // height larger than width use vertical layout
  if (height * 0.7 > width) {
    return PRESET.BASE_VERTICAL;
  }
  return PRESET.BASE;
};

export const positions = getPreset();
// export const secondPositions = PRESET.VERTICAL;
export const secondPositions = null;
