export enum Size {
	Quarter,
	QuarterCenter,
	Half,
	OneThird,
	TwoThird,
	Full,
	FullBright,
	PercentSquare60,
}

export enum Side {
	Top = "top",
	Right = "right",
	Bottom = "bottom",
	Left = "left",
	MiddleX = "middleX",
	MiddleY = "middleY",
	Next = "next",
	ResizeX = "resizeX",
	ResizeY = "resizeY",
	IncreaseCenter = "increaseCenter",
	DecreaseCenter = "decreaseCenter",
}

const sides: Side[] = [Side.Top, Side.Right, Side.Bottom, Side.Left];

const getSides = (size: Size): Positions => sides.map((side) => [size, side]);

type Position = [Size, Side];
export type Positions = Array<Position>;

const quarters: Positions = getSides(Size.Quarter);
const quartersCenter: Positions = [
	...getSides(Size.QuarterCenter),
	[Size.QuarterCenter, Side.MiddleX],
];

const halves: Positions = [
	...getSides(Size.Half), // 0 - 3
	[Size.Half, Side.MiddleX], // 4
	[Size.Half, Side.MiddleY], // 5
];

const oneThird = getSides(Size.OneThird);
const twoThird = getSides(Size.TwoThird);
const extras = {
	twoThirdCenter: [Size.TwoThird, Side.MiddleX] as Position,
	increaseCenter: [Size.PercentSquare60, Side.IncreaseCenter] as Position,
	decreaseCenter: [Size.PercentSquare60, Side.DecreaseCenter] as Position,
};
const common: Positions = [
	[Size.Full, Side.Top],
	[Size.FullBright, Side.Next],
	[Size.Full, Side.Next],
	[Size.FullBright, Side.ResizeX],
	[Size.FullBright, Side.ResizeY],
];

enum DisplayStyle {
	Horizontal = "horizontal",
	Vertical = "vertical",
	Size32 = "size32",
	Advanced = "advanced",
}

const PRESET: Record<string | DisplayStyle, Positions> = {
	ALL: [
		...quarters,
		...quartersCenter,
		...halves,
		...oneThird,
		...twoThird,
		...common,
	],
	[DisplayStyle.Horizontal]: [
		// top row
		common[0],
		quartersCenter[4],
		common[1],
		common[2],
		// second row
		common[3],
		halves[4],
		extras.twoThirdCenter,
		common[4],
		// third row
		quarters[0],
		halves[3],
		halves[1],
		quarters[1],
		// forth row
		quarters[3],
		twoThird[3],
		twoThird[1],
		quarters[2],
	],
	[DisplayStyle.Vertical]: [
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
		quarters[3],
		quarters[2],
		quartersCenter[3],
		quartersCenter[1],
	],
	[DisplayStyle.Advanced]: [
		// top row
		extras.increaseCenter,
		quartersCenter[4],
		common[1],
		common[2],
		// second row
		extras.decreaseCenter,
		halves[4],
		extras.twoThirdCenter,
		common[4],
		// third row
		quarters[0],
		halves[3],
		halves[1],
		quarters[1],
		// forth row
		quarters[3],
		twoThird[3],
		twoThird[1],
		quarters[2],
	],
	[DisplayStyle.Size32]: [
		// top row
		common[0],
		quartersCenter[4],
		halves[4],
		extras.twoThirdCenter,
		// second row
		common[1],
		common[3],
		common[2],
		common[4],
		// third row
		quarters[0],
		halves[3],
		halves[1],
		quarters[1],
		// forth row
		quarters[3],
		twoThird[3],
		twoThird[1],
		quarters[2],
	],
};

const getPreset = () => {
	const { width, height } = window.screen;

	const hasEnvPreset = PRESET[import.meta.env.VITE_DISPLAY_STYLE];
	if (hasEnvPreset) {
		return hasEnvPreset;
	}
	// height larger than width use vertical layout
	if (height * 0.7 > width) {
		return PRESET[DisplayStyle.Vertical];
	}
	return PRESET[DisplayStyle.Horizontal];
};

export const positions = getPreset();
// export const secondPositions = PRESET.VERTICAL;
export const secondPositions = null;
