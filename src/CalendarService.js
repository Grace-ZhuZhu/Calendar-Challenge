import _ from 'lodash';

const STARTING_HOUR = 9;
const WORKING_HOURS = 8;
const MINUTES_IN_ONE_HOUR = 60;

function getNewTimeSlot(event) {
    return {
        events: [event],
        start: event.start,
        end: event.end,
    }
}

export function getSortedEvents(events) {
    return events.sort((a, b) => a.start - b.start);
}

export function getMergedTimeBlocks(events) {
    const sortedEvents = getSortedEvents(events);

    return sortedEvents.reduce((result, event) => {
        if (!result.length) {
            result.push(getNewTimeSlot(event));
            return result;
        }

        const lastSlot = result[result.length - 1];

        if (event.start < lastSlot.end) {
            lastSlot.events.push(event);
            lastSlot.end = Math.max(lastSlot.end, event.end);
        } else {
            result.push(getNewTimeSlot(event))
        }

        return result;
    }, []);
}

export function getDisplayText(hour) {
    return hour < 10 ? `0${hour}` : `${hour}`;
}

export function getHour(time) {
    return Math.floor(time / MINUTES_IN_ONE_HOUR);
}

export function getTimeFromHour(hour) {
    return hour * MINUTES_IN_ONE_HOUR;
}

export function getMinutes(time) {
    return time % MINUTES_IN_ONE_HOUR;
}

export function getTimeDisplay(time) {
    const hour = getHour(time) + STARTING_HOUR;
    const minutes = getMinutes(time);

    return `${getDisplayText(hour)}:${getDisplayText(minutes)}`;
}

export function getMinutesToHourRatio(minutes) {
    return minutes / MINUTES_IN_ONE_HOUR;
}

export function getPercentage(ratio) {
    return `${ratio * 100}%`;
}

export function getEventOffset(eventStart, blockStart) {
    const ratio = getMinutesToHourRatio(eventStart - blockStart);
    return getPercentage(ratio);
}

export function getEventDisplay(event) {
    return `${getTimeDisplay(event.start)}-${getTimeDisplay(event.end)} EVENT`;
}

export function getEventHeightInPercentage(event) {
    const duration = event.end - event.start;
    const heightRatio = getMinutesToHourRatio(duration);
    return getPercentage(heightRatio);
}

export function getEventWidthInPercentage(numberOfEvents) {
    const widthRatio = 1/numberOfEvents;
    return getPercentage(widthRatio);
}

export function getEventForDisplay(event, blockStart, numberOfEvents) {
    return {
        displayText: getEventDisplay(event),
        height: getEventHeightInPercentage(event),
        width: getEventWidthInPercentage(numberOfEvents),
        topOffset:  getEventOffset(event.start, blockStart),
    };
}

export function getBlockOffset(time) {
    const minutes = getMinutes(time);
    const ratio = getMinutesToHourRatio(minutes);
    return getPercentage(ratio) ;
}

export function getEventBlocksForDisplay(timeBlocks) {
    return timeBlocks.map(block => {
        const {start, events} = block;
        const numberOfEvents =  events.length;

        return {
            startingHour: getHour(start),
            events: events.map(eve => getEventForDisplay(eve, start, numberOfEvents)),
            topOffset: getBlockOffset(start)
        }
    });
}

export function getHoursWithEventBlocks(events) {
    const timeBlocks = getMergedTimeBlocks(events);
    const eventsBlocks = getEventBlocksForDisplay(timeBlocks);

    return _.times(WORKING_HOURS).map(hour => {
        return {
            displayText: getTimeDisplay(getTimeFromHour(hour)),
            eventsBlock: eventsBlocks.find(block => block.startingHour === hour) || {},
        }
    });
}
