import React from 'react';
import _ from 'lodash';
import { getHoursWithEventBlocks } from '../CalendarService';
import { EventsBlock } from './EventsBlock';

export function HourList({ events }) {
    const hours = getHoursWithEventBlocks(events);

	return hours.map(hour => (
		<div
			key={_.uniqueId()}
			className="eventItem"
		>
			<div className="hourLabel">{hour.displayText}</div>
            <EventsBlock eventsBlock={hour.eventsBlock}/>
		</div>
	))
}

