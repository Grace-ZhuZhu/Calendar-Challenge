import * as Service from '../CalendarService';

const EVENT_1 = { start: 30, end: 90 };
const EVENT_2 = { start: 150, end: 210 };
const EVENT_3 = { start: 180, end: 210 };

const EVENTS = [
	EVENT_3,
	EVENT_2,
	EVENT_1,
];

const SORTED_EVENTS = [
	EVENT_1,
	EVENT_2,
	EVENT_3,
]

const EVENT_BLOCKS = [
	{
		start: 30,
		end: 90,
		events: [EVENT_1]
	},
	{
		start: 150,
		end: 210,
		events: [EVENT_2, EVENT_3]
	},
];

describe('getSortedEvents', () => {
	it('sort events by starting time', () => {
		const result = Service.getSortedEvents(EVENTS);

		expect(result).toEqual(SORTED_EVENTS);
	})
})

describe('getMergedTimeBlocks', () => {
	it('merges overlapping events in the same time block', () => {
		const result = Service.getMergedTimeBlocks(EVENTS);

		expect(result).toEqual(EVENT_BLOCKS);
	})
})

describe('getDisplayText', () => {
	it('returns the display text of 1 digit number of time', () => {
		const result = Service.getDisplayText(1);

		expect(result).toBe('01');
	})

	it('returns the display text of 2 digits number of time', () => {
		const result = Service.getDisplayText(11);

		expect(result).toBe('11');
	})
})

describe('getHour', () => {
	it('return the number of hours from the input time', () => {
		const result = Service.getHour(61);

		expect(result).toBe(1);
	})
})

describe('getTimeFromHour', () => {
	it('returns number of minutes from the input hour', () => {
		const result = Service.getTimeFromHour(1);

		expect(result).toBe(60);
	})
})

describe('getMinutes', () => {
	it('returns the minutes part of hh:mm format from input time', () => {
		const result = Service.getMinutes(60);

		expect(result).toBe(0);
	})
})

describe('getTimeDisplay', () => {
	it('returns display text of hh:mm format from input time', () => {
		const result = Service.getTimeDisplay(30);

		expect(result).toBe('09:30');
	})
})

describe('getMinutesToHourRatio', () => {
	it('returns the ration of the input time to the minutes of one hour', () => {
		const result = Service.getMinutesToHourRatio(30);

		expect(result).toBe(0.5);
	})
})

describe('getPercentage', () => {
	it('returns the percentage text of a ratio', () => {
		const result = Service.getPercentage(1.5);

		expect(result).toBe('150%');
	})
})

describe('getEventOffset', () => {
	it('returns the offset of the event start and block start in percentage of hour', () => {
		const result = Service.getEventOffset(60, 30);

		expect(result).toBe('50%');
	})
})

describe('getEventDisplay', () => {
	it('returns the display of an event', () => {
		const result = Service.getEventDisplay({ start: 30, end: 60 });

		expect(result).toBe('09:30-10:00 EVENT');
	})
})

describe('getEventHeightInPercentage', () => {
	it('returns the duration of an event in percentage of hour, as the height of an event item', () => {
		const result = Service.getEventHeightInPercentage({ start: 30, end: 60 });

		expect(result).toBe('50%');
	})
})

describe('getEventWidthInPercentage', () => {
	it('returns width of an event item', () => {
		const result = Service.getEventWidthInPercentage(4);

		expect(result).toBe('25%');
	})
})

describe('getEventForDisplay', () => {
	it('returns width of an event item', () => {
		const result = Service.getEventForDisplay({ start: 30, end: 60 }, 0, 2);

		expect(result).toEqual({
			displayText: "09:30-10:00 EVENT",
			height: "50%",
			topOffset: "50%",
			width: "50%"
		});
	})
})

describe('getBlockOffset', () => {
	it('returns the offset of the block start to the hour start in percentage of hour', () => {
		const result = Service.getBlockOffset(150);

		expect(result).toBe('50%');
	})
})

describe('getEventBlocksForDisplay', () => {
	it('returns the offset of the block start to the hour start in percentage of hour', () => {
		const result = Service.getEventBlocksForDisplay(EVENT_BLOCKS);

		console.log(JSON.stringify(result))

		expect(result).toMatchSnapshot();
	})
})

describe('getHoursWithEventBlocks', () => {
	it('returns the working hours with event blocks attached to the hour within which they start', () => {
		const result = Service.getHoursWithEventBlocks(EVENTS);

		expect(result).toMatchSnapshot();
	})
})